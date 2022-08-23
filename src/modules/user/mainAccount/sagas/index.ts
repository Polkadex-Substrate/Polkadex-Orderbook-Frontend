import { takeEvery, takeLatest, takeLeading } from "redux-saga/effects";

import {
  POLKADOT_EXTENSION_WALLET_FETCH,
  MAIN_ACCOUNT_SET_FETCH,
  REGISTER_MAIN_ACCOUNT_FETCH,
  REGISTER_MAIN_ACCOUNT_UPDATE_FETCH,
} from "../constants";

import { polkadotExtensionWalletSaga } from "./polkadotExtensionWalletSaga";
import { registerMainAccountSaga } from "./registerMainAccount";
import { registerMainAccountUpdateSaga } from "./registerUpdateSaga";
import { setMainAccountSaga } from "./setMainAccountSaga";

export function* rootMainAccountsSaga() {
  yield takeLatest(POLKADOT_EXTENSION_WALLET_FETCH, polkadotExtensionWalletSaga);
  yield takeLatest(MAIN_ACCOUNT_SET_FETCH, setMainAccountSaga);
  yield takeLeading(REGISTER_MAIN_ACCOUNT_FETCH, registerMainAccountSaga);
  yield takeLeading(REGISTER_MAIN_ACCOUNT_UPDATE_FETCH, registerMainAccountUpdateSaga);
}
