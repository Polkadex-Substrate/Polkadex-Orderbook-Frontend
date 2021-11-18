import { takeLeading } from "redux-saga/effects";

import { PROFILE_USER_FETCH } from "../constants";

import { userSaga } from "./userSaga";

export function* rootProfileSaga() {
  yield takeLeading(PROFILE_USER_FETCH, userSaga);
}
