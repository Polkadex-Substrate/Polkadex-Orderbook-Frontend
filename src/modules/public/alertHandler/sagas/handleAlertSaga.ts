import { put } from "redux-saga/effects";

import { alertData, AlertPush } from "../actions";

export function* handleAlertSaga(action: AlertPush) {
  yield put(alertData(action.payload));
}
