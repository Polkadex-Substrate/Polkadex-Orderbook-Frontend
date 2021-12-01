import { put, delay } from "redux-saga/effects";

import { notificationData, NotificationPush } from "../actions";
import { notificationDelete } from "..";

import { defaultConfig } from "@polkadex/orderbook-config";

const { alertDisplayTime } = defaultConfig;
export function* handleNotificationSaga(action: NotificationPush) {
  yield put(notificationData(action.payload));
  yield delay(alertDisplayTime);
  yield put(notificationDelete());
}
