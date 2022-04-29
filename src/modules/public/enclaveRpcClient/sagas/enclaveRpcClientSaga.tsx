import { call, put, select, take } from "redux-saga/effects";
import { Client } from "rpc-websockets";
import { eventChannel } from "redux-saga";

import { enclaveRpcConnectionOpen, EnclaveRpcClientFetch } from "../actions";
import { alertPush } from "../../alertHandler";

export function* enclaveRpcClientSaga(action: EnclaveRpcClientFetch) {
  try {
    const enclaveWsClient = new Client("ws://localhost:9945"); // Connect to enclave
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
    return () => {
      console.log("connection with enclave rpc closed...");
      enclaveWsClient.close();
    };
  });
}
