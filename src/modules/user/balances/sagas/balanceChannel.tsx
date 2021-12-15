import { call, put, select, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { u8aToString } from "@polkadot/util";

import {
  alertPush,
  Balance,
  BalanceMessage,
  balancesData,
  selectUserBalance,
  sendError,
} from "../../..";
import { convertOrderEvent } from "../../openOrders/helpers";

import { selectRabbitmqChannel } from "@polkadex/orderbook/modules/public/rabbitmqChannel";

export function* balanceChannelSaga() {
  try {
    const rabbitmqConn = yield select(selectRabbitmqChannel);
    if (rabbitmqConn) {
      if (rabbitmqConn) {
        const channel = yield call(() => fetchrabbitmqChannelAsync(rabbitmqConn));
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
          title: "Something has gone wrong..",
          description: error.message,
        },
        type: "Error",
      })
    );
  }
}

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

async function fetchrabbitmqChannelAsync(chann) {
  console.log(chann);
  const queue = await chann.queue("345563xbh-balance-update-events", { durable: false });
  await queue.bind("amq.direct");
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
