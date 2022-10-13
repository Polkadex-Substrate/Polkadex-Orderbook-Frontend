import { put } from "redux-saga/effects";

import { tradeAccountsFetch } from "../../tradeWallet";
import { registerMainAccountError } from "../actions";

import { sendError } from "@polkadex/orderbook-modules";

export function* registerMainAccountUpdateSaga() {
  try {
    yield put(tradeAccountsFetch());
  } catch (error) {
    console.log("error:", error);
    yield put(
      sendError({
        error: error,
        processingType: "alert",
        extraOptions: {
          actionError: registerMainAccountError,
        },
      })
    );
  }
}
