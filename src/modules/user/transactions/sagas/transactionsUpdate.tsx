import { put } from "redux-saga/effects";

import {
  alertPush,
  Transaction,
  transactionsUpdateEventData,
  TransactionsUpdateEventData,
  TransactionUpdatePayload,
} from "../../..";

import { Utils } from "@polkadex/web-helpers";

export function* transactionsUpdateSaga(action: TransactionsUpdateEventData) {
  try {
    const data = formatTransactionData(action.payload);
    yield put(transactionsUpdateEventData(data));
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
  return {
    ...data,
    fee: Utils.decimals.formatToString(data.fee),
    amount: Utils.decimals.formatToString(data.amount),
    asset: data.asset === "polkadex" ? "PDEX" : data?.asset?.asset,
    time: new Date().toISOString(),
  };
};
