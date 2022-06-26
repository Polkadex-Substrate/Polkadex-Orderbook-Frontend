import { call, put, select, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { API } from "aws-amplify";

import { alertPush, klinePush, KlineSubscribe } from "../../..";

import { onCandleStickEvents } from "@polkadex/orderbook/graphql/subscriptions";

export function* fetchKlineChannelSaga(action: KlineSubscribe) {
  try {
    const { market, interval } = action.payload;
    if (market) {
      const channel = yield call(() => fetchKlineChannel(market, interval));
      while (true) {
        const data = yield take(channel);
        console.log("candlestick update=>", data);
        yield put(
          klinePush({
            kline: {
              open: Number(data.o),
              close: Number(data.c),
              high: Number(data.h),
              low: Number(data.l),
              timestamp: new Date(data.t).getTime() * Math.pow(10, 5),
              volume: Number(data.v_base),
            },
            market: data.m,
            interval: data.interval,
          })
        );
      }
    }
  } catch (error) {
    yield put(
      alertPush({
        message: {
          title: "Something has gone wrong..",
          description: error.message,
        },
        type: "Error",
      })
    );
  }
}

async function fetchKlineChannel(market: string, interval: string) {
  return eventChannel((emitter) => {
    const subscription = API.graphql({
      query: onCandleStickEvents,
      variables: { m: market, interval: interval },
    }).subscribe({
      next: (data) => {
        emitter(data.value.data.onCandleStickEvents);
      },
      error: (err) => {
        console.warn("error in onCandleStickEvents channel", err);
      },
    });
    return () => {
      console.log("unsubscribing current klines");
      subscription.unsubscribe();
    };
  });
}
