import { takeLatest } from "redux-saga/effects";

import { CANCEL_ORDERS_EXECUTE } from "../constants";

import { cancelOrdersSaga } from "./cancelOrdersExecuteSaga";

export function* rootCancelOrdersSaga() {
  yield takeLatest(CANCEL_ORDERS_EXECUTE, cancelOrdersSaga);
}
