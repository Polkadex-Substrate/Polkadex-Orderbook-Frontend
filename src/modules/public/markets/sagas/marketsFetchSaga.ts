import { call, put } from "redux-saga/effects";

import { sendError } from "../../../";
import { marketsData, marketsError, MarketsFetch, setCurrentMarketIfUnset } from "../actions";

import { API, RequestOptions } from "@polkadex/orderbook-config";

const tickersOptions: RequestOptions = {
  apiVersion: "engine",
};

export function* marketsFetchSaga(action: MarketsFetch) {
  try {
    const payload = action.payload;
    const request =
      payload && payload.type ? `/public/markets?type=${payload.type}` : "/public/markets";

    const markets = yield call(API.get(tickersOptions), request);
    yield put(marketsData(markets));
    yield put(setCurrentMarketIfUnset(markets[0]));
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: "alert",
        extraOptions: {
          actionError: marketsError,
        },
      })
    );
  }
}
