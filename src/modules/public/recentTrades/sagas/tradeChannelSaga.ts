import { call, put, select, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { API } from "aws-amplify";

import {
  alertPush,
  klineUpdateFetch,
  Market,
  recentTradesData,
  recentTradesPush,
  selectCurrentMarket,
  selectRecentTrades,
} from "../../..";
import * as subscriptions from "../../../../graphql/subscriptions";

export function* fetchTradeChannelSaga() {
  try {
    const market: Market = yield select(selectCurrentMarket);

    if (market?.name) {
      const base = market.assetIdArray[0] === "-1" ? "PDEX" : market.assetIdArray[0];
      const quote = market.assetIdArray[1] === "-1" ? "PDEX" : market.assetIdArray[1];
      const channel = yield call(() => fetchTradesChannel(`${base}-${quote}`));
      while (true) {
        const tradesMsg = yield take(channel);
        console.log("tradesMsg =>", tradesMsg);
        const trades = yield select(selectRecentTrades);
        const data = JSON.parse(tradesMsg);
        const tradesArray = [data, ...trades];
        yield put(recentTradesData(tradesArray));
        yield put(klineUpdateFetch(data));
      }
    }
  } catch (error) {
    yield put(
      alertPush({
        message: {
          title: "Something has gone wrong (trades fetch)..",
          description: error.message,
        },
        type: "Error",
      })
    );
  }
}

async function fetchTradesChannel(marketid: string) {
  return eventChannel((emit) => {
    console.log("fetchTradesChannel created");
    const subscription = API.graphql({
      query: subscriptions.websocket_streams,
      variables: { name: `PDEX-1-raw-trades` },
    }).subscribe({
      next: (data) => {
        debugger;
        emit(recentTradesPush(data.value.data.onOrderUpdate));
      },
      error: (err) => console.warn(err),
    });
    return subscription.unsubscribe;
  });
}
