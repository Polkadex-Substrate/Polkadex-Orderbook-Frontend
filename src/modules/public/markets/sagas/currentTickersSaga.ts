import { call, put } from "redux-saga/effects";
import axios from "axios";

import { sendError } from "../../../";
import { currentTickersData, CurrentTickersFetch, marketsTickersError } from "../actions";
import { Ticker } from "..";

import { API, RequestOptions } from "@polkadex/orderbook-config";

const tickersOptions: RequestOptions = {
  apiVersion: "influxDB",
};
const ts = Date.now() / 1000;
// TODO: remove mockDate and add tickers when we have endpoint available
export function* currentTickersSaga(action: CurrentTickersFetch) {
  try {
    const payload = { symbol: action.payload.marketId };
    const res = yield call(() => API.post(tickersOptions)("/fetch_ticker", payload));
    if (res.Fine) {
      const _ticker: Partial<Ticker> = JSON.parse(res.Fine);
      const ticker: Ticker = getConvertedTickers(_ticker);
      yield put(currentTickersData({ ticker }));
    } else {
      throw new Error(res.Bad);
    }
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: "alert",
        extraOptions: {
          actionError: marketsTickersError,
        },
      })
    );
  }
}
const getConvertedTickers = (ticker: any): Ticker => {
  let price_change_percent =
    ((Number(ticker.high) - Number(ticker.last)) / Number(ticker.last)) * 100;
  if (isNaN(price_change_percent)) {
    price_change_percent = 0;
  }
  return {
    ...ticker,
    price_change_percent: `${price_change_percent.toFixed(2)}%`,
  };
};
