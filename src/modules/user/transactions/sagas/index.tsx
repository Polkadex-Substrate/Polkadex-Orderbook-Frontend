import { takeEvery, takeLeading } from "redux-saga/effects";

import { TRANSACTIONS_FETCH, TRANSACTIONS_UPDATE_EVENT } from "../constants";

import { transactionsSaga } from "./transactionsSaga";
import { transactionsUpdateSaga } from "./transactionsUpdate";

export function* rootTransactionsSaga() {
  yield takeLeading(TRANSACTIONS_FETCH, transactionsSaga);
  yield takeEvery(TRANSACTIONS_UPDATE_EVENT, transactionsUpdateSaga);
}
