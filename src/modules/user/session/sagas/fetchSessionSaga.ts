import { put } from "redux-saga/effects";

import { userSessionError } from "..";
import { userSessionData } from "../actions";

import { sendError } from "@polkadex/orderbook-modules";
import { subtractMonths } from "@polkadex/orderbook/helpers/substractMonths";

export function* fetchSessionSaga() {
  try {
    // add default user session values
    const dateFrom = subtractMonths(1);
    const dateTo = new Date();
    yield put(userSessionData({ dateFrom, dateTo }));
  } catch (error) {
    console.log(error);
    yield put(
      sendError({
        error,
        processingType: "alert",
        extraOptions: {
          actionError: userSessionError,
        },
      })
    );
  }
}
