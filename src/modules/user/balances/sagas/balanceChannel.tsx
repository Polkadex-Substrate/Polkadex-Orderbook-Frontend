import { call, put, select, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { u8aToString } from "@polkadot/util";

import { alertPush, Balance, BalanceMessage, balancesData, selectUserBalance } from "../../..";
import { ProxyAccount, selectUserInfo } from "../../profile";

import {
  RabbitmqChannelType,
  selectRabbitmqChannel,
} from "@polkadex/orderbook/modules/public/rabbitmqChannel";
import { QUEUE_EXPIRY_TIME } from "@polkadex/web-constants";

export function* balanceChannelSaga() {
  try {
    const userInfo: ProxyAccount = yield select(selectUserInfo);
    const userAddress = userInfo.address;
    if (userAddress) {
      const rabbitmqConn = yield select(selectRabbitmqChannel);
      if (rabbitmqConn) {
        const channel = yield call(() =>
          fetchBalanceUpdatesChannel(rabbitmqConn, userAddress + "-balance-update-events")
        );
        while (true) {
          let balanceMsg = yield take(channel);
          balanceMsg = JSON.parse(balanceMsg);
          const oldBalance = yield select(selectUserBalance);
          const newBalance = updateBalanceFromMsg(oldBalance, balanceMsg);
          yield put(
            balancesData({ timestamp: new Date().getTime(), userBalance: newBalance })
          );
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
// TODO: recheck the types for this function
const updateBalanceFromMsg = (oldBalance: Balance[], balanceMsg: BalanceMessage) => {
  const isAssetAPresent =
    oldBalance && oldBalance.find((elem) => elem.ticker === balanceMsg.asset_a);
  const isAssetBPresent =
    oldBalance && oldBalance.find((elem) => elem.ticker === balanceMsg.asset_b);
  if (isAssetAPresent) {
    const index = oldBalance.findIndex((elem) => elem.ticker === balanceMsg.asset_a);
    oldBalance[index].free = balanceMsg.amount_a;
    oldBalance[index].total = Number(oldBalance[index].free) + Number(oldBalance[index].used);
  } else {
    oldBalance.push({
      ticker: balanceMsg.asset_a,
      free: balanceMsg.amount_a,
      used: 0,
      total: balanceMsg.amount_a,
    });
  }
  if (isAssetBPresent) {
    const index = oldBalance.findIndex((elem) => elem.ticker === balanceMsg.asset_b);
    oldBalance[index].free = balanceMsg.amount_b;
    oldBalance[index].total = Number(oldBalance[index].free) + Number(oldBalance[index].used);
  } else {
    oldBalance.push({
      ticker: balanceMsg.asset_b,
      free: balanceMsg.amount_b,
      used: 0,
      total: balanceMsg.amount_b,
    });
  }
  return [...oldBalance];
};

async function fetchBalanceUpdatesChannel(chann: RabbitmqChannelType, queueName: string) {
  const queue = await chann.queue(queueName, { durable: false });
  return eventChannel((emitter) => {
    const amqpConsumer = queue.subscribe({ noAck: false }, (res) => {
      const msg = u8aToString(res.body);
      emitter(msg);
      res.ack();
    });
    return () => {
      amqpConsumer.then((consumer) => consumer.cancel());
    };
  });
}
