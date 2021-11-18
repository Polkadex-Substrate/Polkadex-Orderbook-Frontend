import { takeLatest } from "redux-saga/effects";

import { PLACE_ORDERS_EXECUTE, CANCEL_ORDERS_EXECUTE } from "../constants";

import { placeOrdersSaga } from "./placeOrdersExecuteSaga";
import { cancelOrdersSaga } from "./cancelOrdersExecuteSaga";

export function* rootPlaceOrdersSaga() {
  yield takeLatest(PLACE_ORDERS_EXECUTE, placeOrdersSaga);
}

export function* rootCancelOrdersSaga() {
  yield takeLatest(CANCEL_ORDERS_EXECUTE, cancelOrdersSaga);
}
