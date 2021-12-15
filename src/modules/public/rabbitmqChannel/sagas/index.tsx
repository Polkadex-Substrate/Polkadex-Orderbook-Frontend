import { takeLeading } from "redux-saga/effects";

import { RABBITMQ_CHANNEL_FETCH } from "../constants";

import { rabbitmqConnectionSaga } from "./rabbitMQconnectSaga";


export function* rootRabbitmqChannelSaga() {
  yield takeLeading(RABBITMQ_CHANNEL_FETCH, rabbitmqConnectionSaga);
}
