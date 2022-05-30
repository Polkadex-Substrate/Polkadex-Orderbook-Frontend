import { takeLeading } from "redux-saga/effects";

import { DEPOSITS_FETCH } from "../constants";

import { fetchDepositsSaga } from "./fetchDepositsSagas";

export function* rootDepositsSaga() {
  yield takeLeading(DEPOSITS_FETCH, fetchDepositsSaga);
}
