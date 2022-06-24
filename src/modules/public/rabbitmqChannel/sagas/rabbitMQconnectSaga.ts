import { call, put } from "redux-saga/effects";

import { alertPush } from "../../alertHandler";
import { rabbitmqChannelData } from "../actions";

import { AMQPWebSocketClient } from "./amqp-websocket-client.mjs";

import { defaultConfig } from "@polkadex/orderbook-config";

const url = `wss://rabbitmq-ws.polkadex.trade/ws/amqp`;
export function* rabbitmqConnectionSaga() {
  try {
    const amqp = new AMQPWebSocketClient(
      url,
      defaultConfig.amqpWsUsername,
      defaultConfig.amqpWsUsername,
      defaultConfig.amqpWsPassword
    );
    const channel = yield call(() => fetchrabbitmqChannelAsync(amqp));
    yield put(rabbitmqChannelData(channel));
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
async function fetchrabbitmqChannelAsync(amqp) {
  try {
    const connection = await amqp.connect();
    const channel = await connection.channel();
    return channel;
  } catch (error) {
    console.log(error);
  }
}
