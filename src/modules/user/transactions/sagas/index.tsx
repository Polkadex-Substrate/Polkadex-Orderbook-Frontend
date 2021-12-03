import { takeLeading } from "redux-saga/effects";

import { TRANSACTIONS_FETCH } from "../constants";

import { transactionsSaga } from "./transactionsSaga";

export function* rootTransactionsSaga() {
  yield takeLeading(TRANSACTIONS_FETCH, transactionsSaga);
}
