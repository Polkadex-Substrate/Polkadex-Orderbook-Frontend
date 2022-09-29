import { takeLatest, takeLeading } from "redux-saga/effects";

import {
  SET_CURRENT_TRADE_ACCOUNT,
  USER_REGISTER_TRADE_ACCOUNT_FETCH,
  USER_TRADE_ACCOUNTS_FETCH,
  USER_TRADE_ACCOUNT_REMOVE_FROM_CHAIN_FETCH,
  USER_TRADE_ACCOUNT_IMPORT_FETCH,
} from "../constants";

import { loadTradeAccountsSaga } from "./loadTradeAccountsSaga";
import { registerTradeAccountSaga } from "./registerTradeAccountSaga";
import { removeProxyAccountFromChainSaga } from "./removeTradeAccountFromChain";
import { setCurrentTradeAccountSaga } from "./setCurrentTradeAccountSaga";
import { importTradeAccountFetchSaga } from "./importTradeAccountSaga";

export function* rootTradeAccountsSaga() {
  yield takeLatest(USER_TRADE_ACCOUNTS_FETCH, loadTradeAccountsSaga);
  yield takeLeading(USER_REGISTER_TRADE_ACCOUNT_FETCH, registerTradeAccountSaga);
  yield takeLatest(SET_CURRENT_TRADE_ACCOUNT, setCurrentTradeAccountSaga);
  yield takeLeading(
    USER_TRADE_ACCOUNT_REMOVE_FROM_CHAIN_FETCH,
    removeProxyAccountFromChainSaga
  );
  yield takeLeading(USER_TRADE_ACCOUNT_IMPORT_FETCH, importTradeAccountFetchSaga);
}
