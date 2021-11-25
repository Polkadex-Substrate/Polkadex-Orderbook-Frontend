import { takeLatest } from "redux-saga/effects";

import { USER_TRADES_FETCH } from "../constants";

import { fetchTradesSaga } from "./fetchDepositSaga";

export function* rootUserBalancesSaga() {
  yield takeLatest(USER_TRADES_FETCH, fetchTradesSaga);
}
