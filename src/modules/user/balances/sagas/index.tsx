import { takeLeading } from "redux-saga/effects";

import { BALANCES_FETCH } from "../constants";

import { balancesSaga } from "./balancesSaga";

export function* rootBalancesSaga() {
  yield takeLeading(BALANCES_FETCH, balancesSaga);
}
