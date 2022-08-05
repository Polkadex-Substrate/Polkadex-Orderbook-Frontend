import { takeLatest, takeLeading } from "redux-saga/effects";

import { USER_REGISTER_TRADE_ACCOUNT_FETCH, USER_TRADE_ACCOUNTS_FETCH } from "../constants";

import { loadProxyAccountsSaga } from "./loadTradeAccountsSaga";
import { registerTradeAccountSaga } from "./registerTradeAccountSaga";

export function* rootTradeAccountsSaga() {
  yield takeLatest(USER_TRADE_ACCOUNTS_FETCH, loadProxyAccountsSaga);
  yield takeLeading(USER_REGISTER_TRADE_ACCOUNT_FETCH, registerTradeAccountSaga);
}
