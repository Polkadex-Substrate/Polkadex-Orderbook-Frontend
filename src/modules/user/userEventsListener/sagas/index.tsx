import { takeLeading } from "redux-saga/effects";

import { USER_EVENTSCHANNEL_FETCH } from "../constants";

import { userEventsChannelSaga } from "./userEventsChannel";

export function* rootUserEventsSaga() {
  yield takeLeading(USER_EVENTSCHANNEL_FETCH, userEventsChannelSaga);
}
