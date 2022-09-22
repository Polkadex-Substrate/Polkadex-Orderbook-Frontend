import { call, put, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { API } from "aws-amplify";

import { alertPush, klinePush, KlineSubscribe } from "../../..";
import * as subscriptions from "../../../../graphql/subscriptions";

import { READ_ONLY_TOKEN } from "@polkadex/web-constants";

export function* fetchKlineChannelSaga(action: KlineSubscribe) {
  try {
    const { market, interval } = action.payload;
    if (market) {
      const channel = yield call(() => fetchKlineChannel(market, interval));
      while (true) {
        const dataStr = yield take(channel);
        const data = JSON.parse(dataStr);
        yield put(
          klinePush({
            kline: {
              open: Number(data.o),
              close: Number(data.c),
              high: Number(data.h),
              low: Number(data.l),
              timestamp: Number(data.t),
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
    console.log("kline channel", `${market}_${interval.toLowerCase()}`);
    const subscription = API.graphql({
      query: subscriptions.websocket_streams,
      variables: { name: `${market}_${interval.toLowerCase()}` },
      authToken: READ_ONLY_TOKEN,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
    }).subscribe({
      next: (data) => {
        emitter(data.value.data.websocket_streams.data);
      },
      error: (err) => {
        console.warn("error in onCandleStickEvents channel", err);
      },
    });
    return () => {
      subscription.unsubscribe();
    };
  });
}
