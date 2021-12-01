import { takeEvery } from "redux-saga/effects";

import { NOTIFICATION_PUSH } from "../constants";

import { handleNotificationSaga } from "./handleNotificationSaga";

export function* rootNotificationSaga() {
  yield takeEvery(NOTIFICATION_PUSH, handleNotificationSaga);
}
