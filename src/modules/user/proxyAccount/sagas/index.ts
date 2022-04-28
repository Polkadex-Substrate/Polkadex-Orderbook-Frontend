import { takeLatest } from "redux-saga/effects";

import { POLKADOT_WALLET_FETCH } from "../constants";

import { loadProxyAccountsSaga } from "./loadProxyAccountsSaga";

export function* rootPolkadotWalletSaga() {
  yield takeLatest(POLKADOT_WALLET_FETCH, loadProxyAccountsSaga);
}
