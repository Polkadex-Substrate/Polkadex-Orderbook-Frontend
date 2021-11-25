import { takeLatest } from "redux-saga/effects";

import { USER_DEPOSITS_FETCH } from "../constants";

import { fetchDepositsSaga } from "./fetchDepositSaga";

export function* rootUserBalancesSaga() {
  yield takeLatest(USER_DEPOSITS_FETCH, fetchDepositsSaga);
}
