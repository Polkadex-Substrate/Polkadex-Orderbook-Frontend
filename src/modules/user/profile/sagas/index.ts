import { takeLatest } from "redux-saga/effects";

import { PROFILE_USER_AUTH_FETCH, PROFILE_USER_SELECT_ACCOUNT_FETCH } from "../constants";

import { userAuthSaga } from "./userAuthSaga";
import { userSelectAccountSaga } from "./userSelectAccountSaga";

export function* rootProfileSaga() {
  yield takeLatest(PROFILE_USER_AUTH_FETCH, userAuthSaga);
  yield takeLatest(PROFILE_USER_SELECT_ACCOUNT_FETCH, userSelectAccountSaga);
}
