import { takeEvery, takeLeading } from "redux-saga/effects";

import { BALANCES_FETCH, BALANCES_UPDATE_EVENT } from "../constants";

import { balancesSaga } from "./balancesSaga";
import { balanceUpdateSaga } from "./balanceUpdate";

export function* rootBalancesSaga() {
  yield takeLeading(BALANCES_FETCH, balancesSaga);
  yield takeEvery(BALANCES_UPDATE_EVENT, balanceUpdateSaga);
}
