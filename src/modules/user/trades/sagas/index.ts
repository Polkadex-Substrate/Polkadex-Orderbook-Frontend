import { takeLatest } from "redux-saga/effects";

import { TRADES_FETCH } from "../constants";

import { fetchTradesSaga } from "./fetchTradesSaga";

export function* rootTradesSaga() {
  yield takeLatest(TRADES_FETCH, fetchTradesSaga);
}
