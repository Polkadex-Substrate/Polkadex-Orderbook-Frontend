import { takeLatest } from "redux-saga/effects";

import { USER_TRADE_ACCOUNTS_FETCH } from "../constants";

import { loadProxyAccountsSaga } from "./loadProxyAccountsSaga";

export function* rootTradeAccountsSaga() {
  yield takeLatest(USER_TRADE_ACCOUNTS_FETCH, loadProxyAccountsSaga);
}
