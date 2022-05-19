import { call, put } from "redux-saga/effects";

import { sendError } from "../../../";
import { currenciesData, currenciesError } from "../actions";

import { API, RequestOptions } from "@polkadex/orderbook-config";

// TODO: UPDATE WHEN DATA IS READY
export function* currenciesFetchSaga() {
  try {
    return;
    const currencies = yield call(API.get(currenciesOptions), "/public/currencies");
    yield put(currenciesData(currencies));
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: "alert",
        extraOptions: {
          actionError: currenciesError,
        },
      })
    );
  }
}
