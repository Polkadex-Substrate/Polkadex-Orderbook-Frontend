import { takeLatest } from "redux-saga/effects";

import { DEPOSITS_FETCH } from "../constants";

import { fetchDepositsSaga } from "./fetchDepositsSagas";

export function* rootDepositsSaga() {
  yield takeLatest(DEPOSITS_FETCH, fetchDepositsSaga);
}
