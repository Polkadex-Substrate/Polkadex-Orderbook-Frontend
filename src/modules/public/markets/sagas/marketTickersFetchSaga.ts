import { call, put } from "redux-saga/effects";
import axios from "axios";
import { API } from "aws-amplify";

import { sendError } from "../../..";
import { marketsTickersError, marketsTickersData, MarketsTickersFetch } from "../actions";
import { Ticker } from "..";
import * as queries from "../../../../graphql/queries";

export function* marketTickersSaga(action: MarketsTickersFetch) {
  try {
    const tickers = yield call(fetchMarketTickers);
    yield put(marketsTickersData(tickers));
  } catch (error) {
    console.error("marekt ticker fetch error", error);
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

const fetchMarketTickers = async (): Promise<Ticker[]> => {
  const res: any = await API.graphql({ query: queries.getAllMarketTickers });
  const tickers = res.data.getAllMarketTickers.items;
  return tickers;
};
