import { takeLeading } from "redux-saga/effects";

import { PROFILE_USER_FETCH } from "../constants";

import { userAuthSaga } from "./userAuthSaga";

export function* rootProfileSaga() {
  yield takeLeading(PROFILE_USER_FETCH, userAuthSaga);
}
