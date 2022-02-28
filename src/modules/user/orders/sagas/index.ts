import { takeEvery } from "redux-saga/effects";

import { ORDER_CANCEL_FETCH, ORDER_EXECUTE_FETCH } from "../constants";

import { cancelOrderSaga } from "./cancelOrderSaga";
import { ordersExecuteSaga } from "./placeOrdersExecuteSaga";

export function* rootOrdersSaga() {
  yield takeEvery(ORDER_EXECUTE_FETCH, ordersExecuteSaga);
  yield takeEvery(ORDER_CANCEL_FETCH, cancelOrderSaga);
}
