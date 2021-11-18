import { takeLatest } from "redux-saga/effects";

import { GET_POLKADOT_WALLET_FETCH } from "../constants";

import { polkadotWalletSaga } from "./polkadotWalletSaga";

export function* rootPolkadotWalletSaga() {
  yield takeLatest(GET_POLKADOT_WALLET_FETCH, polkadotWalletSaga);
}
