import { takeLatest } from "redux-saga/effects";

import { ORDER_EXECUTE_FETCH } from "../constants";

import { ordersExecuteSaga } from "./placeOrdersExecuteSaga";

export function* rootOrdersSaga() {
  yield takeLatest(ORDER_EXECUTE_FETCH, ordersExecuteSaga);
}
