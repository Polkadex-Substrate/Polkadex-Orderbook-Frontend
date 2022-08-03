import { takeLatest, takeLeading } from "redux-saga/effects";

import {
  OPEN_ORDERS_HISTORY_FETCH,
  ORDERS_CHANNEL_FETCH,
  ORDERS_HISTORY_FETCH,
} from "../constants";

import { openOrdersHistorySaga } from "./openOrderHistorySaga";
import { ordersHistorySaga } from "./ordersHistorySaga";
import { orderUpdatesChannelSaga } from "./orderUpdates";

export function* rootOrdersHistorySaga() {
  yield takeLeading(ORDERS_HISTORY_FETCH, ordersHistorySaga);
  yield takeLatest(OPEN_ORDERS_HISTORY_FETCH, openOrdersHistorySaga);
  yield takeLeading(ORDERS_CHANNEL_FETCH, orderUpdatesChannelSaga);
}
