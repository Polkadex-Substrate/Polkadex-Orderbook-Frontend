import { eventChannel } from "redux-saga";
import { call, put, select, take } from "redux-saga/effects";
import { API, JS } from "aws-amplify";

import { depthDataIncrement } from "..";
import { alertPush } from "../../alertHandler";
import * as subscriptions from "../../../../graphql/subscriptions";
import { Market, selectCurrentMarket } from "../../markets";

export function* orderBookChannelSaga() {
  try {
    const market: Market = yield select(selectCurrentMarket);
    if (market?.id) {
      console.log("orderbook channel started");
      let [base, quote] = market.assetIdArray;
      base = base === "-1" ? "PDEX" : base;
      quote = quote === "-1" ? "PDEX" : quote;
      const channel = fetchOrderBookChannel(`${base}-${quote}`);
      while (true) {
        const msg = yield take(channel);
        console.log("orderbook channel", msg);
        const data = JSON.parse(msg);
        yield put(depthDataIncrement(data));
      }
    }
  } catch (error) {
    console.log({ error });
    yield put(
      alertPush({
        message: {
          title: "Something has gone wrong (orderbook channel)..",
          description: error.message,
        },
        type: "Error",
      })
    );
  }
}
function fetchOrderBookChannel(market: string) {
  return eventChannel((emitter) => {
    const subscription = API.graphql({
      query: subscriptions.websocket_streams,
      variables: { name: `${market}-ob-inc` },
    }).subscribe({
      next: (data) => emitter(data.value.data.websocket_streams.data),
      error: (err) => console.log(err),
    });
    return () => {
      subscription.unsubscribe();
    };
  });
}
