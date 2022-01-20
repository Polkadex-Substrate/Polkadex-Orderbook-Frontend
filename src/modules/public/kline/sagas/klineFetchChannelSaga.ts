import { call, put, select, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { u8aToString } from "@polkadot/util";

import { alertPush, klineEventToObject, klinePush } from "../../..";

import {
  RabbitmqChannelType,
  selectRabbitmqChannel,
} from "@polkadex/orderbook/modules/public/rabbitmqChannel";

export function* fetchKlineChannelSaga() {  
  try {
    const rabbitmqConn = yield select(selectRabbitmqChannel);
    if (rabbitmqConn) {      
      const channel = yield call(() =>
      fetchKlineChannel(rabbitmqConn, "one.kline-events", "BTC.USD.kline-events")
      );
      while (true) {
        const data = yield take(channel);
        const klineEventToJson = JSON.parse(data);        
        const klineEvent = klineEventToObject(klineEventToJson);   
        // TODO: marketId and period will be dynamic
        yield put(klinePush({
          marketId: "ethbtc",
          kline: klineEvent,
          period: "5m"
        }));
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

async function fetchKlineChannel(
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
