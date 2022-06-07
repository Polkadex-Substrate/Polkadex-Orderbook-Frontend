import { takeLatest, takeLeading } from "redux-saga/effects";

import { ORDERS_CHANNEL_FETCH, ORDERS_HISTORY_FETCH } from "../constants";

import { ordersHistorySaga } from "./ordersHistorySaga";
import { orderUpdatesChannelSaga } from "./ordersUpdatesChannel";

export function* rootOrdersHistorySaga() {
  yield takeLeading(ORDERS_HISTORY_FETCH, ordersHistorySaga);
  yield takeLeading(ORDERS_CHANNEL_FETCH, orderUpdatesChannelSaga);
}
