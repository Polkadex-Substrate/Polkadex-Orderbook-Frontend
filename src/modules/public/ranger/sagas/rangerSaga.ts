import { call, put, take } from "redux-saga/effects";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { eventChannel } from "@redux-saga/core";

import { alertPush } from "../../..";
import { rangerConnectError, rangerConnectData, rangerNoExtension } from "../actions";
import { orderbookTypes as types } from "../types";

import { defaultConfig } from "@polkadex/orderbook-config";

export function* rangerFetchSaga() {
  try {
    const { web3Enable } = yield call(() => import("@polkadot/extension-dapp"));
    const extensions = yield call(() => web3Enable("Polkadex Orderbook"));
    if (extensions.length === 0) {
      // TODO
      // no extension installed, or the user did not accept the authorization
      // in this case we should inform the use and give a link to the extension
      throw new Error("Polkadot.js extension not detected.");
    }
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

function* fetchRanger() {
  return eventChannel((emitter) => {
    const provider = new WsProvider(defaultConfig.polkadexChain);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const api = new ApiPromise({ provider, types });

    api.on("ready", () => {
      return emitter(rangerConnectData(api));
    });

    api.on("error", (error) => {
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
