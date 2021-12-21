import { call, put, select, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { u8aToString } from "@polkadot/util";
import {
  alertPush, recentTradesData, selectRecentTrades,
} from "../../..";

import { RabbitmqChannelType, selectRabbitmqChannel } from "@polkadex/orderbook/modules/public/rabbitmqChannel";

export function* fetchTradeChannelSaga() {
  try {
    const rabbitmqConn = yield select(selectRabbitmqChannel);
    if (rabbitmqConn) {
        const channel = yield call(() => fetchTradesChannel(rabbitmqConn, "one.trade-events", "BTC.USD.trade-events"));
        while (true) {
          const tradesMsg = yield take(channel);
          const trades = yield select(selectRecentTrades);
          const data = JSON.parse(tradesMsg);
          yield put(recentTradesData([data, ...trades]));
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


async function fetchTradesChannel(chann: RabbitmqChannelType, queueName: string, routingKey: string) {
  const queue = await chann.queue(queueName, { durable: false });
  await queue.bind("topic_exchange", routingKey);
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
