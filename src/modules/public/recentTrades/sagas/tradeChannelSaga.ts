import { call, put, select, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { u8aToString } from "@polkadot/util";
import cryptoRandomString from "crypto-random-string";

import { alertPush, recentTradesData, selectRecentTrades } from "../../..";

import {
  RabbitmqChannelType,
  selectRabbitmqChannel,
} from "@polkadex/orderbook/modules/public/rabbitmqChannel";
import { DEFAULT_RANDOM_STRING_LENGTH, QUEUE_EXPIRY_TIME } from "@polkadex/web-constants";

export function* fetchTradeChannelSaga() {
  try {
    const rabbitmqConn = yield select(selectRabbitmqChannel);
    // random prefix to queue name to avoid collisions
    const queueName =
      cryptoRandomString({ length: DEFAULT_RANDOM_STRING_LENGTH }) + "-trade-events";
    if (rabbitmqConn) {
      const channel = yield call(() =>
        fetchTradesChannel(rabbitmqConn, queueName, "*.*.trade-events")
      );
      while (true) {
        console.log("waiting on recent trades");
        const tradesMsg = yield take(channel);
        console.log("tradesMsg", tradesMsg);
        const trades = yield select(selectRecentTrades);
        const data = JSON.parse(tradesMsg);
        yield put(recentTradesData([data, ...trades]));
      }
    }
  } catch (error) {
    yield put(
      alertPush({
        message: {
          title: "Something has gone wrong (trades fetch)..",
          description: error.message,
        },
        type: "Error",
      })
    );
  }
}

async function fetchTradesChannel(
  chann: RabbitmqChannelType,
  queueName: string,
  routingKey: string
) {
  const queue = await chann.queue(queueName, { durable: false, autoDelete: true });
  await queue.bind("topic_exchange", routingKey);
  return eventChannel((emitter) => {
    const amqpConsumer = queue.subscribe({ noAck: false, exclusive: true }, (res) => {
      const msg = u8aToString(res.body);
      emitter(msg);
      res.ack();
    });
    return () => {
      amqpConsumer.then((consumer) => consumer.cancel());
    };
  });
}
