import { takeEvery, takeLatest, takeLeading } from "redux-saga/effects";

import {
  OPEN_ORDERS_HISTORY_FETCH,
  ORDERS_HISTORY_FETCH,
  ORDER_UPDATE_EVENT,
} from "../constants";

import { openOrdersHistorySaga } from "./openOrderHistorySaga";
import { ordersHistorySaga } from "./ordersHistorySaga";
import { orderUpdatesSaga } from "./orderUpdates";

export function* rootOrdersHistorySaga() {
  yield takeLeading(ORDERS_HISTORY_FETCH, ordersHistorySaga);
  yield takeLatest(OPEN_ORDERS_HISTORY_FETCH, openOrdersHistorySaga);
  yield takeEvery(ORDER_UPDATE_EVENT, orderUpdatesSaga);
}
