import { useReducer } from "react";
import { Provider } from "./context";
import { initialOrderBook, orderBookReducer } from "./reducer";
import { Market } from "@polkadex/orderbook/modules/public/markets/types";
import { fetchAllFromAppSync } from "@polkadex/orderbook/helpers/appsync";
import * as queries from "@polkadex/orderbook/graphql/queries";
import { getDepthFromOrderbook } from "./helper";
import { READ_ONLY_TOKEN } from "@polkadex/web-constants";
import * as subscriptions from "@polkadex/orderbook/graphql/subscriptions";
import { API } from "aws-amplify";
import { eventChannel } from "redux-saga";

import * as T from "./types";
import * as A from "./actions";

export const OrderBookProvider: T.OrderBookComponent = ({
  onError,
  onNotification,
  children,
}) => {
  const [state, dispatch] = useReducer(orderBookReducer, initialOrderBook);

  // Actions
  const onOrderBook = async (payload: Market) => {
    try {
      const market = payload;
      if (market?.m) {
        const dataRaw: T.OrderBookDbState[] = await fetchAllFromAppSync(
          queries.getOrderbook,
          { market: market },
          "getOrderbook"
        );

        const data = formatOrderBookData(dataRaw);
        const { asks, bids } = getDepthFromOrderbook(data);
        dispatch(A.depthData({ asks, bids }));
      }
    } catch (error) {
      onNotification(`Something has gone wrong !! ${error.message}`);
    }
  };

  const onOrderBookChanel = async (payload: Market) => {
    try {
      const market: Market = payload;
      if (market?.m) {
        const channel = fetchOrderBookChannel(market.m);
        while (true) {
          // const msg = await channel;
          // console.log("ob-update event: ", msg);
          // const data: T.OrderbookRawUpdate[] = formatOrderbookUpdate(msg);
          // dispatch(A.depthDataIncrement(data));
        }
      }
    } catch (error) {
      onNotification(`Something has gone wrong (orderbook channel).. ${error.message}`);
    }
  };

  const formatOrderBookData = (data: T.OrderBookDbState[]): T.OrderBookDbState[] => {
    return data.map((item) => ({
      ...item,
      p: item.p,
      q: item.q,
    }));
  };

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

  const formatOrderbookUpdate = (dataStr: string): T.OrderbookRawUpdate[] => {
    const data = JSON.parse(dataStr);
    return data.changes.map((item) => ({
      side: item[0],
      price: item[1],
      qty: item[2],
      seq: item[3],
    }));
  };

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
