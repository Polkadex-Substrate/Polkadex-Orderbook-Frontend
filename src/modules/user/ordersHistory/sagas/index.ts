import { takeLatest } from "redux-saga/effects";

import { ORDERS_HISTORY_FETCH } from "../constants";

import { ordersHistorySaga } from "./ordersHistorySaga";

export function* rootOrdersHistorySaga() {
  yield takeLatest(ORDERS_HISTORY_FETCH, ordersHistorySaga);
}
