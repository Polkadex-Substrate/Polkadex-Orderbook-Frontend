import { call, put } from "redux-saga/effects";

import { sendError } from "../../../";
import { currenciesData, currenciesError } from "../actions";

import { API, RequestOptions } from "@polkadex/orderbook-config";

const currenciesOptions: RequestOptions = {
  apiVersion: "engine",
};

export function* currenciesFetchSaga() {
  try {
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
