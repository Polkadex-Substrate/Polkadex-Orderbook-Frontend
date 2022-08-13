import { takeLatest, takeLeading } from "redux-saga/effects";

import {
  SET_CURRENT_TRADE_ACCOUNT,
  USER_REGISTER_TRADE_ACCOUNT_FETCH,
  USER_TRADE_ACCOUNTS_FETCH,
} from "../constants";

import { loadTradeAccountsSaga } from "./loadTradeAccountsSaga";
import { registerTradeAccountSaga } from "./registerTradeAccountSaga";
import { setCurrentTradeAccountSaga } from "./setCurrentTradeAccountSaga";

export function* rootTradeAccountsSaga() {
  yield takeLatest(USER_TRADE_ACCOUNTS_FETCH, loadTradeAccountsSaga);
  yield takeLeading(USER_REGISTER_TRADE_ACCOUNT_FETCH, registerTradeAccountSaga);
  yield takeLatest(SET_CURRENT_TRADE_ACCOUNT, setCurrentTradeAccountSaga);
}
