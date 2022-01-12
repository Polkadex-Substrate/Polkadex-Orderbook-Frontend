import { takeLatest } from "redux-saga/effects";

import { KLINE_FETCH, KLINE_FETCH_CHANNEL } from "../constants";

import { handleKlineFetchSaga } from "./handleKlineFetchSaga";
import { fetchKlineChannelSaga } from "./klineFetchChannelSaga";

export function* rootKlineFetchSaga() {  
  yield takeLatest(KLINE_FETCH, handleKlineFetchSaga);
  yield takeLatest(KLINE_FETCH_CHANNEL, fetchKlineChannelSaga);
}
