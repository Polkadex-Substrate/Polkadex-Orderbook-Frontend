import { takeLatest } from "redux-saga/effects";

import { USER_BALANCE_FETCH } from "../constants";

import { fetchBalanceSaga } from "./fetchBalanceSaga";

export function* rootUserBalancesSaga() {
  yield takeLatest(USER_BALANCE_FETCH, fetchBalanceSaga);
}
