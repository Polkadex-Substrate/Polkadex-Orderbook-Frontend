import { takeLatest } from "redux-saga/effects";

import {
  AUTH_CODE_VERIFY_FETCH,
  AUTH_LOGOUT_FETCH,
  AUTH_RESEND_CODE_FETCH,
  AUTH_SIGN_IN_FETCH,
  AUTH_SIGN_UP_FETCH,
} from "../constants";

import { codeVerificationSaga } from "./codeVerification";
import { logoutSaga } from "./logoutSaga";
import { resendCodeSaga } from "./resendCode";
import { signInSaga } from "./signInSaga";
import { signUpSaga } from "./signUpSaga";

export function* rootAuthSaga() {
  yield takeLatest(AUTH_SIGN_IN_FETCH, signInSaga);
  yield takeLatest(AUTH_SIGN_UP_FETCH, signUpSaga);
  yield takeLatest(AUTH_LOGOUT_FETCH, logoutSaga);
  yield takeLatest(AUTH_CODE_VERIFY_FETCH, codeVerificationSaga);
  yield takeLatest(AUTH_RESEND_CODE_FETCH, resendCodeSaga);
}
