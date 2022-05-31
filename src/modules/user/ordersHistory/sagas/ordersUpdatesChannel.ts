import { call, put, select, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { u8aToString } from "@polkadot/util";

import {
  FetchOrderUpdatesChannel,
  OrderUpdateEvent,
  userOrderChannelUpdateData,
} from "../actions";
import { ProxyAccount, selectUserInfo } from "../../profile";

import {
  RabbitmqChannelType,
  selectRabbitmqChannel,
} from "@polkadex/orderbook/modules/public/rabbitmqChannel";
import { alertPush } from "@polkadex/orderbook/modules/public/alertHandler";

export function* orderUpdatesChannelSaga(action: FetchOrderUpdatesChannel) {
  console.log("orderUpdateChannel called");
  try {
    const AmqpChannel = yield select(selectRabbitmqChannel);
    const userInfo: ProxyAccount = yield select(selectUserInfo);
    const userAddress = userInfo.address;
    if (AmqpChannel && userAddress) {
      const channel = yield call(() => fetchOrderUpdatesChannel(AmqpChannel, userAddress));
      while (true) {
        let orderMsg = yield take(channel);
        console.log("order update=>" + orderMsg);
        orderMsg = JSON.parse(orderMsg) as OrderUpdateEvent;
        yield put(userOrderChannelUpdateData(orderMsg));
      }
    }
  } catch (error) {
    yield put(
      alertPush({
        message: {
          title: "Something has gone wrong (order updates channel)...",
          description: error.message,
        },
        type: "Error",
      })
    );
  }
}

async function fetchOrderUpdatesChannel(chann: RabbitmqChannelType, address: string) {
  const queueName = `${address}-order-update-events`;
  const routingKey = `${address}-order-update-events`;
  console.log("fetchOrderUpdatesChannel=>", queueName, routingKey);
  const queue = await chann.queue(queueName, { durable: false, autoDelete: true });
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

// {
//   trading_pair: "PDEX/1",
//   update: {
//     Accepted: {
//       order_id: 335613430048268376252486492096633622314,
//       user: "5DwPy8LFTXReZtboaDH3tFN9jqjMpqqnavLuimD2a5s7dHa5",
//       side: "Bid",
//       order_type: "LIMIT",
//       price: "1",
//       qty: "1",
//     },
//   },
// };
