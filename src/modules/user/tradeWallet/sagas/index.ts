import { takeLatest, takeLeading } from "redux-saga/effects";

import {
  USER_REGISTER_TRADE_ACCOUNT_FETCH,
  USER_TRADE_ACCOUNTS_FETCH,
  USER_TRADE_ACCOUNT_REMOVE_FROM_CHAIN_FETCH,
  USER_TRADE_ACCOUNT_IMPORT_FETCH,
  USER_TRADE_ACCOUNT_EXPORT_FETCH,
  USER_TRADE_ACCOUNT_IMPORT_JSON,
} from "../constants";

import { loadTradeAccountsSaga } from "./loadTradeAccountsSaga";
import { registerTradeAccountSaga } from "./registerTradeAccountSaga";
import { removeProxyAccountFromChainSaga } from "./removeTradeAccountFromChain";
import { importTradeAccountFetchSaga } from "./importTradeAccountSaga";
import { exportTradeAccountFetchSaga } from "./exportTradeAccountSaga";
import { importTradeAccountJsonSaga } from "./importTradeAccountJsonSaga";

export function* rootTradeAccountsSaga() {
  yield takeLatest(USER_TRADE_ACCOUNTS_FETCH, loadTradeAccountsSaga);
  yield takeLeading(USER_REGISTER_TRADE_ACCOUNT_FETCH, registerTradeAccountSaga);
  yield takeLeading(
    USER_TRADE_ACCOUNT_REMOVE_FROM_CHAIN_FETCH,
    removeProxyAccountFromChainSaga
  );
  yield takeLeading(USER_TRADE_ACCOUNT_IMPORT_FETCH, importTradeAccountFetchSaga);
  yield takeLatest(USER_TRADE_ACCOUNT_EXPORT_FETCH, exportTradeAccountFetchSaga);
  yield takeLeading(USER_TRADE_ACCOUNT_IMPORT_JSON, importTradeAccountJsonSaga);
}
