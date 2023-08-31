import { useCallback, useEffect, useReducer } from "react";
import { API } from "aws-amplify";
import { GraphQLSubscription } from "@aws-amplify/api";

import { useMarketsProvider } from "../marketsProvider/useMarketsProvider";
import { Market } from "../marketsProvider";

import { Provider } from "./context";
import { initialOrderBook, orderBookReducer } from "./reducer";
import { getDepthFromOrderbook } from "./helper";
import * as T from "./types";
import * as A from "./actions";
import { OBIncrementData, OrderbookRawUpdate } from "./types";

import { fetchAllFromAppSync } from "@polkadex/orderbook/helpers/appsync";
import * as queries from "@polkadex/orderbook/graphql/queries";
import { READ_ONLY_TOKEN } from "@polkadex/web-constants";
import * as subscriptions from "@polkadex/orderbook/graphql/subscriptions";
import { useSettingsProvider } from "@polkadex/orderbook/providers/public/settings";
import { Websocket_streamsSubscription } from "@polkadex/orderbook/API";

export const OrderBookProvider: T.OrderBookComponent = ({ children }) => {
  const [state, dispatch] = useReducer(orderBookReducer, initialOrderBook);
  const { currentMarket } = useMarketsProvider();
  const { onHandleError } = useSettingsProvider();

  // Actions
  const onOrderBook = useCallback(
    async (payload: Market) => {
      try {
        const market = payload;
        if (market?.m) {
          const dataRaw: T.OrderBookDbState[] = await fetchAllFromAppSync(
            queries.getOrderbook,
            { market: market.m },
            "getOrderbook"
          );
          const data = formatOrderBookData(dataRaw);
          const { asks, bids } = getDepthFromOrderbook(data);
          dispatch(A.depthData({ asks, bids }));
        }
      } catch (error) {
        console.log(error);
        onHandleError(`Orderbook fetch error:${error.message}`);
      }
    },
    [onHandleError]
  );

  useEffect(() => {
    if (currentMarket?.m) {
      const subscription = API.graphql<GraphQLSubscription<Websocket_streamsSubscription>>({
        query: subscriptions.websocket_streams,
        variables: { name: `${currentMarket.m}-ob-inc` },
        authToken: READ_ONLY_TOKEN,
      }).subscribe({
        next: (resp) => {
          const msg = resp.value.data.websocket_streams.data;
          const data: T.OrderbookRawUpdate[] = formatOrderbookUpdate(msg);
          console.log("got orderbook event: ", msg, currentMarket.m);
          dispatch(A.depthDataIncrement(data));
        },
        error: (err) => console.log(err),
      });
      return () => subscription.unsubscribe();
    }
  }, [currentMarket?.m]);

  const formatOrderBookData = (data: T.OrderBookDbState[]): T.OrderBookDbState[] => {
    return data.map((item) => ({
      ...item,
      p: item.p,
      q: item.q,
    }));
  };

  const formatOrderbookUpdate = (dataStr: string): OrderbookRawUpdate[] => {
    const data = JSON.parse(dataStr) as OBIncrementData;
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

  useEffect(() => {
    if (currentMarket?.m) {
      onOrderBook(currentMarket);
    }
  }, [currentMarket, dispatch, onOrderBook]);

  return (
    <Provider
      value={{
        ...state,
        onOrderBook,
      }}>
      {children}
    </Provider>
  );
};
