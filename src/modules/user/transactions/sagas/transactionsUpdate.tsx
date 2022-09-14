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
      sid: data.sid ?? 0,
      main_account: data.user,
      fee: data.fee.toString(),
      amount: data.amount.toString(),
      asset: data.asset === "polkadex" ? "PDEX" : data?.asset?.asset,
      time: new Date().toISOString(),
    };
  } else {
    return {
      event_id: data.event_id,
      status: data.status,
      sid: Number(data.sid) ?? 0,
      txn_type: "WITHDRAW",
      main_account: data.user,
      fee: data.fee.toString(),
      amount: data.amount.toString(),
      asset: data.asset === "polkadex" ? "PDEX" : data?.asset?.asset,
      time: new Date().toISOString(),
    };
  }
};
