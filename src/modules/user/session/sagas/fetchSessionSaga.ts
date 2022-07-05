import { put } from "redux-saga/effects";
import { userTradesError } from "..";
import { sendError } from "@polkadex/orderbook-modules";
import { subtractMonths } from "@polkadex/orderbook/helpers/substractMonths";
import { userSessionData } from "../actions";

export function* fetchSessionSaga() {
  try {
    // add default user session values
    const dateFrom = subtractMonths(1).toISOString();
    const dateTo = new Date().toISOString();
    yield put(userSessionData({dateFrom, dateTo}))

  } catch (error) {
    console.log(error);
    yield put(
      sendError({
        error,
        processingType: "alert",
        extraOptions: {
          actionError: userTradesError,
        },
      })
    );
  }
}


