import { eventChannel } from "redux-saga";
import { put, take } from "redux-saga/effects";
import { API } from "aws-amplify";

import { depthDataIncrement, OrderBookChannelFetch } from "..";
import { alertPush } from "../../alertHandler";
import * as subscriptions from "../../../../graphql/subscriptions";
import { Market } from "../../markets";

export function* orderBookChannelSaga(action: OrderBookChannelFetch) {
  try {
    const market: Market = action.payload;

    if (market?.m) {
      const channel = fetchOrderBookChannel(market.m);
      while (true) {
        const msg = yield take(channel);
        const data = JSON.parse(msg);
        yield put(depthDataIncrement(data));
      }
    }
  } catch (error) {
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
