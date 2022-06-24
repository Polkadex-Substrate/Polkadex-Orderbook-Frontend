import { takeLeading } from "redux-saga/effects";

import { MARKETS_FETCH, MARKETS_TICKERS_FETCH } from "../constants";

import { marketsFetchSaga } from "./marketsFetchSaga";
import { marketTickersSaga } from "./marketTickersFetchSaga";

export function* rootMarketsSaga() {
  yield takeLeading(MARKETS_FETCH, marketsFetchSaga);
  yield takeLeading(MARKETS_TICKERS_FETCH, marketTickersSaga);
}
