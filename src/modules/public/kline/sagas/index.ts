import { takeLatest } from "redux-saga/effects";

import { KLINE_FETCH, KLINE_FETCH_CHANNEL, KLINE_UPDATE_FETCH } from "../constants";

import { handleKlineFetchSaga } from "./handleKlineFetchSaga";
import { fetchKlineChannelSaga } from "./klineFetchChannelSaga";
import { updateKlineSaga } from "./updateKlineSaga";

export function* rootKlineFetchSaga() {
  yield takeLatest(KLINE_FETCH, handleKlineFetchSaga);
  yield takeLatest(KLINE_FETCH_CHANNEL, fetchKlineChannelSaga);
  yield takeLatest(KLINE_UPDATE_FETCH, updateKlineSaga);
}
