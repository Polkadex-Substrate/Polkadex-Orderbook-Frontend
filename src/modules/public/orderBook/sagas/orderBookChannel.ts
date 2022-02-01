import { eventChannel } from "redux-saga";
import { call, put, select, take } from "redux-saga/effects";
import { u8aToString } from "@polkadot/util";
import cryptoRandomString from "crypto-random-string";

import { depthData, DepthState, orderBookData, OrderBookState } from "..";
import { alertPush } from "../../alertHandler";
import { RabbitmqChannelType, selectRabbitmqChannel } from "../../rabbitmqChannel";

import { DEFAULT_RANDOM_STRING_LENGTH } from "@polkadex/web-constants";

export function* orderBookChannelSaga() {
  try {
    const rabbitmqConn = yield select(selectRabbitmqChannel);
    const queueName =
      cryptoRandomString({ length: DEFAULT_RANDOM_STRING_LENGTH }) + "-orderbook-snapshot";
    if (rabbitmqConn) {
      const channel = yield call(() =>
        fetchOrderBookChannel(rabbitmqConn, queueName, "*.*.orderbook-snapshot")
      );
      while (true) {
        const tradesMsg = yield take(channel);
        console.log("orderbook channel", tradesMsg);
        const data: OrderBookState = JSON.parse(tradesMsg);
        const { asks, bids } = getDepthFromOrderbook(data);
        yield put(orderBookData(data));
        yield put(depthData({ asks, bids }));
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

function getDepthFromOrderbook(data: OrderBookState): DepthState {
  const bids = data.bids.map((bid) => {
    return [bid.price, bid.volume];
  });
  const asks = data.asks.map((ask) => {
    return [ask.price, ask.volume];
  });
  return { bids, asks };
}
