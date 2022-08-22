import { takeLeading } from "redux-saga/effects";

import { TRADES_FETCH } from "../constants";

import { fetchTradesSaga } from "./fetchTradesSaga";

export function* rootTradesSaga() {
  yield takeLeading(TRADES_FETCH, fetchTradesSaga);
}
