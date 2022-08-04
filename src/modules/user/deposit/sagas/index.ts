import { takeLeading } from "redux-saga/effects";

import { DEPOSITS_FETCH } from "../constants";

import { fetchDepositSaga } from "./fetchDepositSagas";

export function* rootDepositsSaga() {
  yield takeLeading(DEPOSITS_FETCH, fetchDepositSaga);
}
