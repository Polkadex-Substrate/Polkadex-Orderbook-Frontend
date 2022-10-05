import { call, put, select } from "redux-saga/effects";

import { notificationPush } from "../../notificationHandler";
import { tradeAccountsFetch } from "../../tradeAccount";
import { RegisterMainAccountUpdateEvent } from "../actions";

import { sendError } from "@polkadex/orderbook-modules";

export function* registerMainAccountUpdateSaga(_action: RegisterMainAccountUpdateEvent) {
  try {
    yield put(tradeAccountsFetch());
    yield put(
      notificationPush({
        message: { title: "Successfully Registered!" },
        type: "SuccessAlert",
        time: new Date().getTime(),
        hasConfetti: true,
      })
    );
  } catch (error) {
    yield put(
      sendError({
        error: error,
        processingType: "alert",
        // extraOptions: {
        //   actionError: userError,
        // },
      })
    );
  }
}
