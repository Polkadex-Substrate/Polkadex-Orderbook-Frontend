import { takeLatest } from "redux-saga/effects";

import {
  PROFILE_USER_AUTH_FETCH,
  PROFILE_USER_FETCH,
  PROFILE_USER_SELECT_ACCOUNT_FETCH,
} from "../constants";

import { userAuthSaga } from "./userAuthSaga";
import { userSaga } from "./userSaga";
import { userSelectAccountSaga } from "./userSelectAccountSaga";

export function* rootProfileSaga() {
  yield takeLatest(PROFILE_USER_FETCH, userSaga);
  yield takeLatest(PROFILE_USER_AUTH_FETCH, userAuthSaga);
  yield takeLatest(PROFILE_USER_SELECT_ACCOUNT_FETCH, userSelectAccountSaga);
}
