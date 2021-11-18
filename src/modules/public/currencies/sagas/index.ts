import { takeLeading } from "redux-saga/effects";

import { CURRENCIES_FETCH } from "../constants";

import { currenciesFetchSaga } from "./currenciesFetchSaga";

export function* rootCurrenciesSaga() {
  yield takeLeading(CURRENCIES_FETCH, currenciesFetchSaga);
}
