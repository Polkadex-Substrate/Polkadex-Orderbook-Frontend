import { takeEvery } from "redux-saga/effects";

import { SESSION_FETCH } from "../constants";

import { fetchSessionSaga } from "./fetchSessionSaga";

export function* rootSessionSaga() {
  yield takeEvery(SESSION_FETCH, fetchSessionSaga);
}
