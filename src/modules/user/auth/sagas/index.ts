import { takeLatest } from "redux-saga/effects";

import {
  AUTH_CONNECT_PHONE_FETCH,
  AUTH_IMPORT_ACCOUNT_FETCH,
  AUTH_LOGOUT_FETCH,
  AUTH_SIGN_IN_FETCH,
  AUTH_SIGN_UP_FETCH,
} from "../constants";

import { connectPhoneSaga } from "./connectPhoneSaga";
import { importAccountSaga } from "./importAccountSaga";
import { logoutSaga } from "./logoutSaga";
import { signInSaga } from "./signInSaga";
import { signUpSaga } from "./signUpSaga";

export function* rootAuthSaga() {
  yield takeLatest(AUTH_SIGN_IN_FETCH, signInSaga);
  yield takeLatest(AUTH_SIGN_UP_FETCH, signUpSaga);
  yield takeLatest(AUTH_LOGOUT_FETCH, logoutSaga);
  yield takeLatest(AUTH_CONNECT_PHONE_FETCH, connectPhoneSaga);
  yield takeLatest(AUTH_IMPORT_ACCOUNT_FETCH, importAccountSaga);
}
