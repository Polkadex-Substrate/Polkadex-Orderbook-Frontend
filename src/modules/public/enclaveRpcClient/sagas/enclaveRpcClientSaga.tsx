import { call, put, select, take } from "redux-saga/effects";
import { Client } from "rpc-websockets";
import { eventChannel } from "redux-saga";

import {
  enclaveRpcConnectionOpen,
  EnclaveRpcClientFetch,
  enclaveRpcClientError,
} from "../actions";
import { alertPush } from "../../alertHandler";

import { defaultConfig } from "@polkadex/orderbook-config";

const { enclaveUrl } = defaultConfig;
export function* enclaveRpcClientSaga(action: EnclaveRpcClientFetch) {
  try {
    const enclaveWsClient = new Client(enclaveUrl); // Connect to enclave
    const channel = yield call(() => fetchEnclaveRpcClientChannel(enclaveWsClient));
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

async function fetchEnclaveRpcClientChannel(enclaveWsClient: Client) {
  // .. const queue = await chann.queue(queueName, { durable: false, autoDelete: true });
  return eventChannel((emitter) => {
    enclaveWsClient.on("open", () => {
      console.log("connected with enclave...");
      emitter(enclaveRpcConnectionOpen(enclaveWsClient));
    });

    enclaveWsClient.on("error", (error) => {
      console.log("Error", error);
      return emitter(enclaveRpcClientError(error.message));
    });

    enclaveWsClient.on("closee", () => {
      emitter(enclaveRpcConnectionOpen(enclaveWsClient));
    });
    return () => {
      console.log("connection with enclave rpc closed...");
      enclaveWsClient.close();
    };
  });
}
