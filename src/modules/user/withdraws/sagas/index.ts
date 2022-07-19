import { takeLeading } from "redux-saga/effects";

import { WITHDRAWS_FETCH } from "../constants";

import { fetchWithdrawsSaga } from "./fetchWithdrawsSaga";

export function* rootWithdrawsSaga() {
  yield takeLeading(WITHDRAWS_FETCH, fetchWithdrawsSaga);
}
