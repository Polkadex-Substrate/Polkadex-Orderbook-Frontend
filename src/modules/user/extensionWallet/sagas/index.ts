import { takeLatest, takeLeading } from "redux-saga/effects";

import {
  POLKADOT_EXTENSION_WALLET_FETCH,
  REGISTER_MAIN_ACCOUNT_FETCH,
  REGISTER_MAIN_ACCOUNT_UPDATE_FETCH,
  REGISTER_MAIN_ACCOUNT_RESET,
  REGISTER_MAIN_ACCOUNT_LINK_EMAIL,
} from "../constants";

import { polkadotExtensionWalletSaga } from "./polkadotExtensionWalletSaga";
import { registerMainAccountSaga } from "./registerMainAccount";
import { registerMainAccountResetSaga } from "./registerMainAccountReset";
import { registerMainAccountUpdateSaga } from "./registerUpdateSaga";
import { linkEmailSaga } from "./linkEmailSaga";

export function* rootMainAccountsSaga() {
  yield takeLatest(POLKADOT_EXTENSION_WALLET_FETCH, polkadotExtensionWalletSaga);
  yield takeLeading(REGISTER_MAIN_ACCOUNT_FETCH, registerMainAccountSaga);
  yield takeLeading(REGISTER_MAIN_ACCOUNT_UPDATE_FETCH, registerMainAccountUpdateSaga);
  yield takeLeading(REGISTER_MAIN_ACCOUNT_RESET, registerMainAccountResetSaga);
  yield takeLeading(REGISTER_MAIN_ACCOUNT_LINK_EMAIL, linkEmailSaga);
}
