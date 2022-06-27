import { takeLatest, takeLeading } from "redux-saga/effects";

import { RECENT_TRADES_FETCH, RECENT_TRADES_FETCH_CHANNEL } from "../constants";

import { recentTradesFetchSaga } from "./recentTradesFetchSaga";
import { fetchTradeChannelSaga } from "./tradeChannelSaga";

export function* rootRecentTradesSaga() {
  yield takeLeading(RECENT_TRADES_FETCH, recentTradesFetchSaga);
  yield takeLatest(RECENT_TRADES_FETCH_CHANNEL, fetchTradeChannelSaga);
}
