import { takeLatest, takeLeading } from "redux-saga/effects";

import { KLINE_FETCH, KLINE_SUBSCRIBE } from "../constants";

import { handleKlineFetchSaga } from "./handleKlineFetchSaga";
import { fetchKlineChannelSaga } from "./klineFetchChannelSaga";

export function* rootKlineFetchSaga() {
  yield takeLeading(KLINE_FETCH, handleKlineFetchSaga);
  yield takeLatest(KLINE_SUBSCRIBE, fetchKlineChannelSaga);
}
