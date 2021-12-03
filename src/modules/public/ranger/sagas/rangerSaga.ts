import { call, put, take } from "redux-saga/effects";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { eventChannel } from "@redux-saga/core";

import { alertPush } from "../../..";
import { rangerConnectError, rangerConnectData } from "../actions";
import { orderbookTypes as types } from "../types";

import AMQPWebSocketClient from "./amqp-websocket-client";

import { defaultConfig } from "@polkadex/orderbook-config";

const tls = window.location.scheme === "https:";
const url = `${tls ? "wss" : "ws"}://${window.location.host}`;
const amqp = new AMQPWebSocketClient(
  url,
  "uwkbvyaj",
  "uwkbvyaj",
  "ZkWyU-ZFryl7QFz3WAZR6PWMMhhx43Rk"
);

export function* rangerFetchSaga() {
  try {
    console.log("fetching ranger");
    const channel_RMQ = yield call(() => start());
    const channel = yield call(() => fetchRanger());
    while (true) {
      const action = yield take(channel);
      yield put(action);
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

async function start() {
  try {
    debugger;
    const conn = await amqp.connect();
    console.log("connection", conn);
    debugger;
    const ch = await conn.channel();
    debugger;
    const q = await ch.queue("");
    debugger;
    await q.bind("amq.fanout");
    const consumer = await q.subscribe({ noAck: false }, (msg) => {
      console.log(msg);
      msg.ack();
    });
    return ch;
  } catch (err) {
    console.error("Error", err, "reconnecting in 1s");
    debugger;
    setTimeout(start, 1000);
  }
}
function* fetchRanger() {
  const { web3Enable } = yield call(() => import("@polkadot/extension-dapp"));
  yield call(() => web3Enable("PolkadexIdo"));

  return eventChannel((emitter) => {
    const provider = new WsProvider(defaultConfig.polkadotJsWs);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const api = new ApiPromise({ provider, types });

    api.on("connected", () => {
      return emitter(rangerConnectData(api));
    });

    api.on("error", (error) => {
      console.log("Error", error);
      return emitter(rangerConnectError());
    });

    api.on("disconnected", () => {
      return emitter(rangerConnectError());
    });

    return () => {
      api.disconnect();
    };
  });
}
