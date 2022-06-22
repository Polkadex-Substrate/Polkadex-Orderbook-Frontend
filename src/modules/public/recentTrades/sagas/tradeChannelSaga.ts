import { call, put, select, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { API } from "aws-amplify";

import {
  alertPush,
  klineUpdateFetch,
  recentTradesData,
  recentTradesPush,
  selectCurrentMarket,
  selectRecentTrades,
} from "../../..";
import * as subscriptions from "../../../../graphql/subscriptions";

export function* fetchTradeChannelSaga() {
  try {
    const market = yield select(selectCurrentMarket);

    if (market.id) {
      const channel = yield call(() => fetchTradesChannel("PDEX/1"));
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
    const subscription = API.graphql({
      query: subscriptions.websocket_streams,
      variables: { name: `${marketid}-raw_trades` },
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
