import { takeEvery, takeLatest, takeLeading } from "redux-saga/effects";

import { PROFILE_USER_FETCH, PROFILE_USER_LIST_FETCH } from "../constants";

import { userListSaga } from "./userListSaga";
import { userSaga } from "./userSaga";

export function* rootProfileSaga() {
  yield takeLeading(PROFILE_USER_FETCH, userSaga);
  yield takeLatest(PROFILE_USER_LIST_FETCH, userListSaga);
}
