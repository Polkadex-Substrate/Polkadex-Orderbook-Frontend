import { put, delay } from "redux-saga/effects";

import { notificationData, NotificationPush, notificationMarkAsReadBy } from "../actions";

import { defaultConfig } from "@polkadex/orderbook-config";

const { alertDisplayTime } = defaultConfig;
export function* handleNotificationSaga(action: NotificationPush) {
  yield put(notificationData(action.payload));
  yield delay(alertDisplayTime);
  yield put(notificationMarkAsReadBy({ id: action.payload.id, by: "isActive" }));
}
