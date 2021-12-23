import { takeLatest } from "redux-saga/effects";

import { ORDER_BOOK_CHANNEL_FETCH, ORDER_BOOK_FETCH } from "../constants";

import { orderBookChannelSaga } from "./orderBookChannel";
import { orderBookSaga } from "./orderBookSaga";

export function* rootOrderBookSaga() {
  yield takeLatest(ORDER_BOOK_FETCH, orderBookSaga);
  yield takeLatest(ORDER_BOOK_CHANNEL_FETCH, orderBookChannelSaga);
}
