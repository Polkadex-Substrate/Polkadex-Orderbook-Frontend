import { takeLeading } from "redux-saga/effects";

import { TRANSACTIONS_FETCH, TRANSACTION_CHANNEL_FETCH } from "../constants";

import { transactionsChannelSaga } from "./transactionsChannelSaga";
import { transactionsSaga } from "./transactionsSaga";

export function* rootTransactionsSaga() {
  yield takeLeading(TRANSACTIONS_FETCH, transactionsSaga);
  yield takeLeading(TRANSACTION_CHANNEL_FETCH, transactionsChannelSaga);
}
