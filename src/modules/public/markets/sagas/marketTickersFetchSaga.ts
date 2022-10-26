import { call, put } from "redux-saga/effects";

import { sendError } from "../../..";
import { marketsTickersError, marketsTickersData, MarketsTickersFetch } from "../actions";
import { Ticker } from "..";
import * as queries from "../../../../graphql/queries";

import { sendQueryToAppSync } from "@polkadex/orderbook/helpers/appsync";

export type TickerQueryResult = {
  m?: string;
  o: string;
  c: string;
  h: string;
  l: string;
  vb: string;
  vq: string;
};

export function* marketTickersSaga(_action: MarketsTickersFetch) {
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
  const res: any = await sendQueryToAppSync({ query: queries.getAllMarketTickers });
  const tickersRaw: TickerQueryResult[] = res.data.getAllMarketTickers.items;
  const tickers: Ticker[] = tickersRaw.map((elem) => {
    const priceChange = Number(elem.c) - Number(elem.o);
    const priceChangePercent = (priceChange / Number(elem.o)) * 100;
    return {
      m: elem.m,
      priceChange24Hr: priceChange,
      priceChangePercent24Hr: priceChangePercent,
      open: elem.o,
      close: elem.c,
      high: elem.h,
      low: elem.l,
      volumeBase24hr: elem.vb,
      volumeQuote24Hr: elem.vq,
    };
  });
  return tickers;
};
