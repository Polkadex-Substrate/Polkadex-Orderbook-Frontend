import { call, put, race, select, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";

import { alertPush, BalanceMessage, selectUserBalance } from "../../..";
import { ProxyAccount, selectUserInfo } from "../../profile";
import { Balance, BalanceChannelFetch, balanceChannelTradeUpdateData } from "../actions";

import { fetchBalanceUpdatesChannel } from "./helpers";

import { selectRabbitmqChannel } from "@polkadex/orderbook/modules/public/rabbitmqChannel";
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
      if (rabbitmqConn) {
        const proxyChannel = yield call(() =>
          fetchBalanceUpdatesChannel(rabbitmqConn, proxyQueueName, proxyRoutingKey)
        );

        while (true) {
          const tradeMsg = yield take(proxyChannel);
          console.log("balanceMsg =>", tradeMsg);
          const balanceMsg: BalanceMessage = JSON.parse(tradeMsg);
          const updateBalance = updateBalanceFromTradeMsg(balanceMsg, getAsset);
          yield put(balanceChannelTradeUpdateData(updateBalance));
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
