import { eventChannel } from "redux-saga";
import { call, put, select, take } from "redux-saga/effects";
import { u8aToString } from "@polkadot/util";

import { orderBookData } from "..";
import { alertPush } from "../../alertHandler";
import { RabbitmqChannelType, selectRabbitmqChannel } from "../../rabbitmqChannel";

export function* orderBookChannelSaga() {
  try {
    const rabbitmqConn = yield select(selectRabbitmqChannel);

    if (rabbitmqConn) {
      const channel = yield call(() =>
        fetchOrderBookChannel(
          rabbitmqConn,
          "one.orderbook-snapshot",
          "BTC.USD.orderbook-snapshot"
        )
      );
      while (true) {
        const tradesMsg = yield take(channel);
        const data = JSON.parse(tradesMsg);
        yield put(orderBookData(data));
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
async function fetchOrderBookChannel(
  chann: RabbitmqChannelType,
  queueName: string,
  routingKey: string
) {
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
