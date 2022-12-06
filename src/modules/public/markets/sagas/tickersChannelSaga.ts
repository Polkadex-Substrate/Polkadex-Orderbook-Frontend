import { put, select, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { API } from "aws-amplify";

import { MarketsTickerChannelFetch, marketsTickersChannelData } from "../actions";
import * as subscriptions from "../../../../graphql/subscriptions";
import { Market } from "../types";
import { selectCurrentMarket } from "..";

import { TickerQueryResult } from "./marketTickersFetchSaga";

import { alertPush } from "@polkadex/orderbook/modules/public/alertHandler";
import { READ_ONLY_TOKEN } from "@polkadex/web-constants";

export function* marketTickersChannelSaga(_action: MarketsTickerChannelFetch) {
  try {
    const market: Market = yield select(selectCurrentMarket);
    if (market?.m) {
      const channel = createMarketTickersChannel(market.m);
      while (true) {
        const action = yield take(channel);
        console.log("ticker update");
        yield put(action);
      }
    }
  } catch (error) {
    console.log("error in ticker update", error);
    yield put(
      alertPush({
        message: {
          title: "Something has gone wrong (marketTickers updates channel)...",
          description: error.message,
        },
        type: "Error",
      })
    );
  }
}

function createMarketTickersChannel(market: string) {
  return eventChannel((emit) => {
    const subscription = API.graphql({
      query: subscriptions.websocket_streams,
      variables: { name: market + "-ticker" },
      authToken: READ_ONLY_TOKEN,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
    }).subscribe({
      next: (data) => {
        const data_parsed: TickerQueryResult = JSON.parse(
          data.value.data.websocket_streams.data
        );
        const ticker_data = convertToTicker(data_parsed, market);
        emit(marketsTickersChannelData(ticker_data));
      },
      error: (err) => console.warn(err),
    });
    return () => {
      subscription.unsubscribe();
    };
  });
}

const convertToTicker = (elem: TickerQueryResult, market: string) => {
  const priceChange = Number(elem.c) - Number(elem.o);
  const priceChangePercent = (priceChange / Number(elem.o)) * 100;
  return {
    m: market,
    priceChange24Hr: priceChange,
    priceChangePercent24Hr: priceChangePercent,
    open: elem.o,
    close: elem.c,
    high: elem.h,
    low: elem.l,
    volumeBase24hr: elem.vb,
    volumeQuote24Hr: elem.vq,
  };
};
