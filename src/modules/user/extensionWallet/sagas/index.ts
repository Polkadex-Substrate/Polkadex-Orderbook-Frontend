import { takeLatest } from "redux-saga/effects";

import { EXTENSION_WALLET_FETCH } from "../constants";

import { extensionWalletSaga } from "./extensionWalletSaga";

export function* rootExtensionWalletSaga() {
  yield takeLatest(EXTENSION_WALLET_FETCH, extensionWalletSaga);
}
