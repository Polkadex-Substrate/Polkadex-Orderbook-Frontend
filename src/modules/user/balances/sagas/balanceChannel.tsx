import { call, put, race, select, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { u8aToString } from "@polkadot/util";

import { alertPush, BalanceMessage, selectUserBalance } from "../../..";
import { ProxyAccount, selectUserInfo } from "../../profile";
import {
  Balance,
  BalanceChannelFetch,
  balanceChannelTradeUpdateData,
  balanceChannelTransferUpdateData,
  BalanceChannelTransferUpdateData,
  BalanceTransferMessage,
} from "../actions";

import {
  RabbitmqChannelType,
  selectRabbitmqChannel,
} from "@polkadex/orderbook/modules/public/rabbitmqChannel";
import { IPublicAsset, selectGetAsset } from "@polkadex/orderbook/modules/public/assets";

export function* balanceChannelSaga(action: BalanceChannelFetch) {
  console.log("balanceChannelSaga called");
  try {
    const userInfo: ProxyAccount = yield select(selectUserInfo);
    const userAddress = userInfo.address;
    if (userAddress) {
      const rabbitmqConn = yield select(selectRabbitmqChannel);
      const getAsset = yield select(selectGetAsset);
      const proxyAddress = userAddress;
      const proxyQueueName = `${proxyAddress}-balance-update-events`;
      const proxyRoutingKey = `${proxyAddress}-balance-update-events`;
      const mainAddress = userInfo.main_addr;
      const mainQueueName = `${mainAddress}-balance-update-events`;
      const mainRoutingKey = `${mainAddress}-balance-update-events`;
      if (rabbitmqConn) {
        const proxyChannel = yield call(() =>
          fetchBalanceUpdatesChannel(rabbitmqConn, proxyQueueName, proxyRoutingKey)
        );
        const mainChannel = yield call(() =>
          fetchBalanceUpdatesChannel(rabbitmqConn, mainQueueName, mainRoutingKey)
        );

        while (true) {
          const { tradeMsg, transferMsg } = yield race({
            tradeMsg: take(proxyChannel),
            transferMsg: take(mainChannel),
          });
          console.log("balanceMsg =>", { tradeMsg, transferMsg });
          if (tradeMsg) {
            const balanceMsg: BalanceMessage = JSON.parse(tradeMsg);
            const updateBalance = updateBalanceFromTradeMsg(balanceMsg, getAsset);
            yield put(balanceChannelTradeUpdateData(updateBalance));
          } else if (transferMsg) {
            const balanceMsg: BalanceTransferMessage = JSON.parse(transferMsg);
            const updateBalance = updateBalanceFromDepositMsg(balanceMsg, getAsset);
            yield put(balanceChannelTransferUpdateData(updateBalance));
          }
        }
      }
    }
  } catch (error) {
    yield put(
      alertPush({
        message: {
          title: "Something has gone wrong (balances channel)...",
          description: error.message,
        },
        type: "Error",
      })
    );
  }
}
async function fetchBalanceUpdatesChannel(
  chann: RabbitmqChannelType,
  queueName: string,
  routingKey: string
) {
  const queue = await chann.queue(queueName, { durable: false, autoDelete: true });
  await queue.bind("topic_exchange", routingKey);
  console.log("created balance update queue", queueName);
  return eventChannel((emitter) => {
    const amqpConsumer = queue.subscribe({ noAck: false }, (res) => {
      const msg = u8aToString(res.body);
      console.log("balance update msg =>", msg);
      emitter(msg);
      res.ack();
    });
    return () => {
      amqpConsumer.then((consumer) => consumer.cancel());
    };
  });
}

const updateBalanceFromTradeMsg = (
  msg: BalanceMessage,
  getAsset: (id: string) => IPublicAsset
): Balance[] => {
  const update: BalanceMessage["update"]["BalanceUpdate"] = msg.update.BalanceUpdate;
  if (update) {
    let [baseAsset, quoteAsset] = msg.trading_pair.split("/");
    baseAsset = baseAsset === "PDEX" ? "-1" : baseAsset;
    quoteAsset = quoteAsset === "PDEX" ? "-1" : quoteAsset;
    const baseFree = update.base_free;
    const baseReserved = update.base_reserved;
    const quoteFree = update.quote_free;
    const quoteReserved = update.quote_reserved;
    const newBalance: Balance[] = [
      {
        name: getAsset(baseAsset).name,
        symbol: getAsset(baseAsset).symbol,
        assetId: baseAsset,
        free_balance: baseFree,
        reserved_balance: baseReserved,
      },
      {
        name: getAsset(quoteAsset).name,
        symbol: getAsset(quoteAsset).symbol,
        assetId: quoteAsset,
        free_balance: quoteFree,
        reserved_balance: quoteReserved,
      },
    ];
    return newBalance;
  }
};

const updateBalanceFromDepositMsg = (
  msg: BalanceTransferMessage,
  getAsset: (id: string) => IPublicAsset
): BalanceChannelTransferUpdateData["payload"] => {
  const assetId = msg.update.Deposit.asset === "PDEX" ? "-1" : msg.update.Deposit.asset;
  const amount = msg.update.Deposit.amount;
  return {
    name: getAsset(assetId).name,
    symbol: getAsset(assetId).symbol,
    amount,
    assetId,
  };
};
