import { call, put, take } from "redux-saga/effects";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { eventChannel, END } from "@redux-saga/core";

import { alertPush, sendError } from "../../..";
import { rangerConnectError, rangerConnectData, rangerNoExtension } from "../actions";
import { orderbookTypes as types } from "../types";

import { defaultConfig } from "@polkadex/orderbook-config";

export function* rangerFetchSaga() {
  try {
    /* Checking if the extension is installed. */
    const { web3Enable } = yield call(() => import("@polkadot/extension-dapp"));
    const extensions = yield call(() => web3Enable("Polkadex Orderbook"));
    if (extensions.length === 0) yield put(rangerNoExtension());

    /* A way to listen Polkadotjs API event channel. */
    const channel = yield call(() => fetchRanger());
    while (true) {
      const action = yield take(channel);
      yield put(action);
    }
  } catch (error) {
    yield put(
      alertPush({
        message: {
          title: "Error connecting to Polkadex chain..",
          description: error.message,
        },
        type: "Error",
      })
    );
  }
}

/* Connecting to the Polkadex Chain. */
function* fetchRanger() {
  return eventChannel((emitter) => {
    const provider = new WsProvider(defaultConfig.polkadexChain);
    const api = new ApiPromise({ provider, types });

    api.on("ready", () => emitter(rangerConnectData(api)));
    api.on("disconnected", () => emitter(END));
    api.on("error", () =>
      emitter(
        sendError({
          error: `Polkadex can't connect to ${defaultConfig.polkadexChain}`,
          processingType: "alert",
          extraOptions: {
            actionError: rangerConnectError,
          },
        })
      )
    );
    return () => {
      api.disconnect();
    };
  });
}
