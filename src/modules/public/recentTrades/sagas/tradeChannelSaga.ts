import { call, put, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { API } from "aws-amplify";

import {
  alertPush,
  Market,
  PublicTrade,
  RecentTradesChannelFetch,
  recentTradesPush,
} from "../../..";
import * as subscriptions from "../../../../graphql/subscriptions";

export function* fetchTradeChannelSaga(action: RecentTradesChannelFetch) {
  try {
    const market: Market = action.payload;
    if (market?.m) {
      const channel = yield call(() => fetchTradesChannel(market.m));
      while (true) {
        const tradesMsg = yield take(channel);
        const data = JSON.parse(tradesMsg);
        const trade: PublicTrade = {
          price: data.price,
          amount: data.quantity,
          market_id: data.market,
          timestamp: data.time,
        };
        yield put(recentTradesPush(trade));
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

async function fetchTradesChannel(market: string) {
  return eventChannel((emit) => {
    const subscription = API.graphql({
      query: subscriptions.websocket_streams,
      variables: { name: `${market}-raw-trade` },
    }).subscribe({
      next: (data) => {
        // "data": "{\"price\":\"1.20\",\"quantity\":\"1\",\"market\":\"PDEX-1\",\"time\":1656065662309}"
        emit(data.value.data.websocket_streams.data);
      },
      error: (err) => console.warn(err),
    });
    return subscription.unsubscribe;
  });
}
