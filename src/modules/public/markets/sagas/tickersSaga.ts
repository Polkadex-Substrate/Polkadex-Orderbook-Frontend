import { call, put } from "redux-saga/effects";

import { sendError } from "../../../";
import { marketsTickersData, marketsTickersError } from "../actions";

import { API, RequestOptions } from "@polkadex/orderbook-config";

const tickersOptions: RequestOptions = {
  apiVersion: "engine",
};
const ts = Date.now() / 1000;
// TODO: remove mockDate and add tickers when we have endpoint available
export function* tickersSaga() {
  try {
    const tickers = mockData();

    if (tickers) {
      const pairs = Object.keys(tickers);

      const convertedTickers = pairs.reduce((result, pair) => {
        result[pair] = tickers[pair].ticker;

        return result;
      }, {});
      yield put(marketsTickersData(convertedTickers));
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
const mockData = () => ({
  btczar: {
    at: ts,
    ticker: {
      amount: "60.0",
      buy: "1200.0",
      sell: "1300.0",
      low: "1150.0",
      high: "1350.0",
      last: "1250.0",
      volume: "120.0",
      open: 1251.0,
      price_change_percent: "+0.08%",
    },
  },
  ethbtc: {
    at: ts,
    ticker: {
      amount: "124.021",
      buy: "0.240",
      sell: "0.250",
      low: "0.238",
      high: "0.253",
      last: "0.245",
      volume: "200.0",
      open: 0.247,
      price_change_percent: "+0.81%",
    },
  },
});
