import { put } from "redux-saga/effects";

import {
  alertPush,
  Transaction,
  TransactionsUpdateEvent,
  transactionsUpdateEventData,
  TransactionUpdatePayload,
} from "../../..";

export function* transactionsUpdateSaga(action: TransactionsUpdateEvent) {
  try {
    if (action.payload) {
      console.log("transactionsUpdateSaga", action.payload);
      const data = formatTransactionData(action.payload);
      yield put(transactionsUpdateEventData(data));
    }
  } catch (error) {
    yield put(
      alertPush({
        message: {
          title: "Something has gone wrong (transactions update saga)...",
          description: error.message,
        },
        type: "Error",
      })
    );
  }
}

const formatTransactionData = (data: TransactionUpdatePayload): Transaction => {
  if (data.txn_type === "DEPOSIT") {
    return {
      ...data,
      stid: Number(data.stid),
      main_account: data.user,
      fee: data.fee.toString(),
      amount: data.amount.toString(),
      asset: data.asset.asset,
      time: new Date().toISOString(),
    };
  } else {
    return {
      stid: Number(data.stid),
      status: data.status,
      txn_type: "WITHDRAWAL",
      main_account: data.user,
      fee: data.fee.toString(),
      amount: data.amount.toString(),
      asset: data.asset.asset,
      time: new Date().toISOString(),
    };
  }
};
