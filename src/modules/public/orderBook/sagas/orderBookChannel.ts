import { eventChannel } from "redux-saga";
import { put, take } from "redux-saga/effects";
import { API } from "aws-amplify";

import { depthDataIncrement, OrderBookChannelFetch } from "..";
import { alertPush } from "../../alertHandler";
import * as subscriptions from "../../../../graphql/subscriptions";
import { Market } from "../../markets";

import { READ_ONLY_TOKEN } from "@polkadex/web-constants";

type OrderbookRawUpdate = {
  side: "Bid" | "Ask";
  price: string;
  qty: string;
  seq: number;
};

export function* orderBookChannelSaga(action: OrderBookChannelFetch) {
  try {
    const market: Market = action.payload;
    if (market?.m) {
      const channel = fetchOrderBookChannel(market.m);
      while (true) {
        const msg = yield take(channel);
        console.log("ob-update event: ", msg);
        const data: OrderbookRawUpdate[] = formatOrderbookUpdate(msg);
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
      authToken: READ_ONLY_TOKEN,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
    }).subscribe({
      next: (data) => {
        emitter(data.value.data.websocket_streams.data);
      },
      error: (err) => console.log(err),
    });
    return () => {
      subscription.unsubscribe();
    };
  });
}

type OBIncData = {
  i: number;
  m: string;
  b: Record<string, string>;
  a: Record<string, string>;
};
const formatOrderbookUpdate = (dataStr: string): OrderbookRawUpdate[] => {
  const data = JSON.parse(dataStr) as OBIncData;
  const { b, a } = data;
  const bids = Object.entries(b).map(
    ([price, qty]): OrderbookRawUpdate => ({
      side: "Bid",
      price,
      qty,
      seq: data.i,
    })
  );
  const asks = Object.entries(a).map(
    ([price, qty]): OrderbookRawUpdate => ({
      side: "Ask",
      price,
      qty,
      seq: data.i,
    })
  );
  return [...bids, ...asks];
};
