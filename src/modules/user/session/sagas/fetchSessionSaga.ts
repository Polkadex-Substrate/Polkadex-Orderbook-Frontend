import { put } from "redux-saga/effects";
import { endOfDay, startOfMonth } from "date-fns";

import { userSessionError } from "..";
import { userSessionData } from "../actions";

import { sendError } from "@polkadex/orderbook-modules";

export function* fetchSessionSaga() {
  try {
    // add default user session values
    const now = new Date();
    const dateFrom = startOfMonth(now);
    const dateTo = endOfDay(now); // adds 2 hours to current time
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
