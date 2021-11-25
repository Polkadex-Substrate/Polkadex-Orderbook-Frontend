import { takeLatest } from "redux-saga/effects";

import { WITHDRAWS_FETCH } from "../constants";

import { fetchWithdrawsSaga } from "./fetchWithdrawsSaga";

export function* rootWithdrawsSaga() {
  yield takeLatest(WITHDRAWS_FETCH, fetchWithdrawsSaga);
}
