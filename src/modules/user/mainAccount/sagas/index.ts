import { takeLatest } from "redux-saga/effects";

import { EXTENSION_WALLET_FETCH, MAIN_ACCOUNT_SET_FETCH } from "../constants";

import { extensionWalletSaga } from "./extensionWalletSaga";
import { setMainAccountSaga } from "./setMainAccountSaga";

export function* rootExtensionWalletSaga() {
  yield takeLatest(EXTENSION_WALLET_FETCH, extensionWalletSaga);
  yield takeLatest(MAIN_ACCOUNT_SET_FETCH, setMainAccountSaga);
}
