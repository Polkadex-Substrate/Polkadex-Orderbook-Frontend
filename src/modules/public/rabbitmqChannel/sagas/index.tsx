import { takeLeading } from "redux-saga/effects";

import { RABBITMQ_CHANNEL_FETCH } from "../constants";

import { rabbitmqChannelSaga } from "./rabbitmqChannelSaga";

export function* rootRabbitmqChannelSaga() {
  yield takeLeading(RABBITMQ_CHANNEL_FETCH, rabbitmqChannelSaga);
}
