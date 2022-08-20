import { takeLatest, takeLeading } from "redux-saga/effects";

import { TRADES_FETCH, USER_TRADES_UPDATE_EVENT } from "../constants";

import { fetchTradesSaga } from "./fetchTradesSaga";
import { userTradeUpdateSaga } from "./userTradesUpdateSaga";

export function* rootTradesSaga() {
  yield takeLeading(TRADES_FETCH, fetchTradesSaga);
  yield takeLatest(USER_TRADES_UPDATE_EVENT, userTradeUpdateSaga);
}
