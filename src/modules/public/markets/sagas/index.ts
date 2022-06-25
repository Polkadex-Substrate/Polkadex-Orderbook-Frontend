import { takeLatest, takeLeading } from "redux-saga/effects";

import {
  MARKETS_FETCH,
  MARKETS_TICKERS_FETCH,
  MARKET_TICKER_CHANNEL_FETCH,
} from "../constants";

import { marketsFetchSaga } from "./marketsFetchSaga";
import { marketTickersSaga } from "./marketTickersFetchSaga";
import { marketTickersChannelSaga } from "./tickersChannelSaga";

export function* rootMarketsSaga() {
  yield takeLeading(MARKETS_FETCH, marketsFetchSaga);
  yield takeLeading(MARKETS_TICKERS_FETCH, marketTickersSaga);
  yield takeLeading(MARKET_TICKER_CHANNEL_FETCH, marketTickersChannelSaga);
}
