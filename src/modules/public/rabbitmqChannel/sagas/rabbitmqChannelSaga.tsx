import { call, put, select, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { u8aToString } from "@polkadot/util";

import { sendError } from "../../..";
import { rabbitmqChannelFetch, rabbitmqChannelData, rabbitmqChannelError } from "../actions";
import { alertPush } from "../../alertHandler";

import AMQPWebSocketClient from "./amqp-websocket-client";

const url = `wss://roedeer.rmq.cloudamqp.com/ws/amqp`;

export function* rabbitmqChannelSaga() {
  try {
    const amqp = new AMQPWebSocketClient(
      url,
      "uwkbvyaj",
      "uwkbvyaj",
      "ZkWyU-ZFryl7QFz3WAZR6PWMMhhx43Rk"
    );
    const channel = yield call(() => fetchrabbitmqChannelAsync(amqp));
    while (true) {
      const msg = yield take(channel);
      console.log("inside while true", msg);
    }
  } catch (error) {
    console.log("error in rabbitmq", error);
    return;
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
async function fetchrabbitmqChannelAsync(amqp) {
  const conn = await amqp.connect();
  const chann = await conn.channel();
  const queue = await chann.queue("345563xbh-balance-update-events", { durable: false });
  await queue.bind("amq.direct");
  return eventChannel((emitter) => {
    queue.subscribe({ noAck: false }, (res) => {
      console.log({ res });
      const msg = u8aToString(res.body);
      emitter(msg);
      res.ack();
    });
    return () => {
      conn.close();
    };
  });
}
