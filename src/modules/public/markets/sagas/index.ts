import { takeLeading } from "redux-saga/effects";

import {
  MARKETS_FETCH,
  MARKETS_TICKERS_FETCH,
  MARKET_CURRENT_TICKERS_FETCH,
  MARKET_PRICE_FETCH,
} from "../constants";

import { marketsFetchSaga } from "./marketsFetchSaga";
import { currentTickersSaga } from "./currentTickersSaga";
import { marketPriceSaga } from "./marketPriceSaga";

export function* rootMarketsSaga() {
  yield takeLeading(MARKETS_FETCH, marketsFetchSaga);
  yield takeLeading(MARKET_CURRENT_TICKERS_FETCH, currentTickersSaga);
  yield takeLeading(MARKET_PRICE_FETCH, marketPriceSaga);
}
