import { call, put } from "redux-saga/effects";
import { API } from "aws-amplify";

import { sendError } from "../../..";
import { marketsTickersError, marketsTickersData, MarketsTickersFetch } from "../actions";
import { Ticker } from "..";
import * as queries from "../../../../graphql/queries";
import { sendQueryToAppSync } from "@polkadex/orderbook/helpers/appsync";

export type TickerQueryResult = {
  m: string;
  pc: string;
  pcp: string;
  o: string;
  c: string;
  h: string;
  l: string;
  v_base: string;
  v_quote;
  nt: string;
};

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
  const res: any = await sendQueryToAppSync(queries.getAllMarketTickers);
  const tickersRaw: TickerQueryResult[] = res.data.getAllMarketTickers.items;
  const tickers: Ticker[] = tickersRaw.map((elem) => ({
    m: elem.m,
    priceChange24Hr: elem.pc,
    priceChangePercent24Hr: elem.pcp,
    open: elem.o,
    close: elem.c,
    high: elem.h,
    low: elem.l,
    volumeBase24hr: elem.v_base,
    volumeQuote24Hr: elem.v_quote,
  }));
  return tickers;
};
