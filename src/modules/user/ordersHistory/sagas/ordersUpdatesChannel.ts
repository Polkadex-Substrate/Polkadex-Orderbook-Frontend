import { call, select, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { u8aToString } from "@polkadot/util";

import { FetchOrderUpdatesChannel, OrderUpdateEvent } from "../actions";
import { selectOrdersHistory } from "..";

import { selectRabbitmqChannel } from "@polkadex/orderbook/modules/public/rabbitmqChannel";

export function* orderUpdatesChannelSaga(action: FetchOrderUpdatesChannel) {
  const AmqpChannel = yield select(selectRabbitmqChannel);
  if (AmqpChannel) {
    const channel = yield call(() => fetchOrderUpdatesChannel(AmqpChannel));
    while (true) {
      let orderMsg = yield take(channel);
      orderMsg = JSON.parse(orderMsg) as OrderUpdateEvent;
      const prevOrders = yield select(selectOrdersHistory);
    }
  }
}

async function fetchOrderUpdatesChannel(chann) {
  const queue = await chann.queue("345563xbh-order-update-events", { durable: false });
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
