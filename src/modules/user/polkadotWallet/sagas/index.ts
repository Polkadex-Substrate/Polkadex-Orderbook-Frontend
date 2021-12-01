import { takeLatest } from "redux-saga/effects";

import { POLKADOT_WALLET_FETCH } from "../constants";

import { polkadotWalletSaga } from "./polkadotWalletSaga";

export function* rootPolkadotWalletSaga() {
  yield takeLatest(POLKADOT_WALLET_FETCH, polkadotWalletSaga);
}
