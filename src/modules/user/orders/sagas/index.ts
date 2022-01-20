import { takeEvery } from "redux-saga/effects";

import { ORDER_EXECUTE_FETCH } from "../constants";

import { ordersExecuteSaga } from "./placeOrdersExecuteSaga";

export function* rootOrdersSaga() {
  yield takeEvery(ORDER_EXECUTE_FETCH, ordersExecuteSaga);
}
