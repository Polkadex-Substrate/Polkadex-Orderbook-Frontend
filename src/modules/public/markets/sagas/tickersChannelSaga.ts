import { put, select, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { API } from "aws-amplify";

import { MarketsTickerChannelFetch, marketsTickersChannelData } from "../actions";
import * as subscriptions from "../../../../graphql/subscriptions";
import { Market } from "../types";
import { selectCurrentMarket } from "..";

import { alertPush } from "@polkadex/orderbook/modules/public/alertHandler";

export function* marketTickersChannelSaga(action: MarketsTickerChannelFetch) {
  console.log("marketTicker channel called");
  try {
    const market: Market = yield select(selectCurrentMarket);
    if (market?.m) {
      const channel = createMarketTickersChannel(market.m);
      while (true) {
        const action = yield take(channel);
        yield put(action);
      }
    }
  } catch (error) {
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
      query: subscriptions.onNewTicker,
      variables: { m: market },
    }).subscribe({
      next: (data) => {
        emit(marketsTickersChannelData(data.value.data.onNewTicker));
      },
      error: (err) => console.warn(err),
    });
    return subscription.unsubscribe;
  });
}

/*
{
    "m": "PDEX-1",
    "priceChange24Hr": "-0.19999999999999996",
    "priceChangePercent24Hr": "-0.16666666666666663",
    "open": "1.2",
    "close": "1",
    "high": "1.2",
    "low": "1.2",
    "volumeBase24hr": "3",
    "volumeQuote24Hr": "3.2"
}
*/
