import { useCallback, useEffect, useReducer } from "react";
import { API } from "aws-amplify";

import { useMarketsProvider } from "../marketsProvider/useMarketsProvider";
import { Market } from "../marketsProvider";

import { Provider } from "./context";
import { initialOrderBook, orderBookReducer } from "./reducer";
import { getDepthFromOrderbook } from "./helper";
import * as T from "./types";
import * as A from "./actions";

import { fetchAllFromAppSync } from "@polkadex/orderbook/helpers/appsync";
import * as queries from "@polkadex/orderbook/graphql/queries";
import { READ_ONLY_TOKEN } from "@polkadex/web-constants";
import * as subscriptions from "@polkadex/orderbook/graphql/subscriptions";
import { useSettingsProvider } from "@polkadex/orderbook/providers/public/settings";

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

  const onOrderBookChanel = useCallback((market: Market) => {
    const subscription = API.graphql({
      query: subscriptions.websocket_streams,
      variables: { name: `${market.m}-ob-inc` },
      authToken: READ_ONLY_TOKEN,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
    }).subscribe({
      next: (resp) => {
        const msg = resp.value.data.websocket_streams.data;
        const data: T.OrderbookRawUpdate[] = formatOrderbookUpdate(msg);
        dispatch(A.depthDataIncrement(data));
      },
      error: (err) => console.log(err),
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const formatOrderBookData = (data: T.OrderBookDbState[]): T.OrderBookDbState[] => {
    return data.map((item) => ({
      ...item,
      p: item.p,
      q: item.q,
    }));
  };

  const formatOrderbookUpdate = (dataStr: string): T.OrderbookRawUpdate[] => {
    const data = JSON.parse(dataStr);
    return data.changes.map((item) => ({
      side: item[0],
      price: item[1],
      qty: item[2],
      seq: item[3],
    }));
  };

  useEffect(() => {
    if (currentMarket?.m) {
      onOrderBook(currentMarket);
      onOrderBookChanel(currentMarket);
    }
  }, [currentMarket, dispatch, onOrderBook, onOrderBookChanel]);

  return (
    <Provider
      value={{
        ...state,
        onOrderBook,
        onOrderBookChanel,
      }}>
      {children}
    </Provider>
  );
};
