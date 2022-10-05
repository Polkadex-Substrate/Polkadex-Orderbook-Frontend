import { takeLeading } from "redux-saga/effects";

import {
  PROFILE_USER_AUTH_FETCH,
  PROFILE_USER_FETCH,
  PROFILE_USER_SELECT_ACCOUNT_FETCH,
} from "../constants";

import { userAuthSaga } from "./userAuthSaga";
import { userSaga } from "./userSaga";
import { userSelectAccountSaga } from "./userSelectAccountSaga";

export function* rootProfileSaga() {
  yield takeLeading(PROFILE_USER_AUTH_FETCH, userAuthSaga);
  yield takeLeading(PROFILE_USER_SELECT_ACCOUNT_FETCH, userSelectAccountSaga);
  yield takeLeading(PROFILE_USER_FETCH, userSaga);
}
