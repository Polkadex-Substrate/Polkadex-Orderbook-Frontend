import { takeEvery } from "redux-saga/effects";

import { AUTH_LOGOUT_FETCH, AUTH_SIGN_IN_FETCH, AUTH_SIGN_UP_FETCH } from "../constants";

import { logoutSaga } from "./logoutSaga";
import { signInSaga } from "./signInSaga";
import { signUpSaga } from "./signUpSaga";

export function* rootAuthSaga() {
  yield takeEvery(AUTH_SIGN_IN_FETCH, signInSaga);
  yield takeEvery(AUTH_SIGN_UP_FETCH, signUpSaga);
  yield takeEvery(AUTH_LOGOUT_FETCH, logoutSaga);
}
