import { put } from "redux-saga/effects";

import { alertPush, transactionsUpdateEventData, TransactionsUpdateEventData } from "../../..";

export function* transactionsUpdateSaga(action: TransactionsUpdateEventData) {
  try {
    yield put(transactionsUpdateEventData(action.payload));
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
