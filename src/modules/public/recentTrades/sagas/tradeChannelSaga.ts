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

import { Utils } from "@polkadex/web-helpers";
import { READ_ONLY_TOKEN } from "@polkadex/web-constants";

type RawTradeEvent = {
  m: string;
  p: string;
  q: string;
  t: number;
};
export function* fetchTradeChannelSaga(action: RecentTradesChannelFetch) {
  try {
    const market: Market = action.payload;
    if (market?.m) {
      const channel = yield call(() => fetchTradesChannel(market.m));
      while (true) {
        const tradesMsg = yield take(channel);
        const data: RawTradeEvent = JSON.parse(tradesMsg);
        const trade: PublicTrade = {
          price: data.p,
          amount: data.q,
          market_id: data.m,
          timestamp: new Date(data.t).toISOString(),
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
  console.log("recent trades channel", `${market}-recent-trades`);
  return eventChannel((emit) => {
    const subscription = API.graphql({
      query: subscriptions.websocket_streams,
      variables: { name: `${market}-recent-trades` },
      authToken: READ_ONLY_TOKEN,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
    }).subscribe({
      next: (data) => {
        emit(data.value.data.websocket_streams.data);
      },
      error: (err) => console.warn(err),
    });
    return subscription.unsubscribe;
  });
}
