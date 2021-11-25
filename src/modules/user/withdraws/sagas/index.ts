import { takeLatest } from "redux-saga/effects";

import { USER_WITHDRAWS_FETCH } from "../constants";

import { fetchWithdrawsSaga } from "./fetchWithdrawSaga";

export function* rootUserBalancesSaga() {
  yield takeLatest(USER_WITHDRAWS_FETCH, fetchWithdrawsSaga);
}
