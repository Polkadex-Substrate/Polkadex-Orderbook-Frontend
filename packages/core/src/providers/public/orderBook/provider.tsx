import { useCallback, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import _ from "lodash";
import { API } from "aws-amplify";
import { GraphQLSubscription } from "@aws-amplify/api";
import { useMarketsProvider } from "@orderbook/core/providers/public/marketsProvider";
import {
  deleteFromBook,
  fetchAllFromAppSync,
  replaceOrAddToBook,
} from "@orderbook/core/helpers";
import * as queries from "@orderbook/core/graphql/queries";
import { QUERY_KEYS, READ_ONLY_TOKEN } from "@orderbook/core/constants";
import * as subscriptions from "@orderbook/core/graphql/subscriptions";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import { Websocket_streamsSubscription } from "@orderbook/core/API";

import { Market } from "../marketsProvider";

import { Provider } from "./context";
import { getDepthFromOrderbook } from "./helper";
import * as T from "./types";
import { OBIncrementData, OrderbookRawUpdate } from "./types";

export const OrderBookProvider: T.OrderBookComponent = ({ children }) => {
  const queryClient = useQueryClient();
  const { currentMarket } = useMarketsProvider();
  const { onHandleError } = useSettingsProvider();

  const onFetchOrderBookData = async (market: Market) => {
    if (market?.m) {
      const dataRaw: T.OrderBookDbState[] = await fetchAllFromAppSync(
        queries.getOrderbook,
        { market: market.m },
        "getOrderbook"
      );
      const data = formatOrderBookData(dataRaw);
      return getDepthFromOrderbook(data);
    }
  };

  const { data, isLoading, isFetching } = useQuery({
    queryKey: QUERY_KEYS.orderBook(currentMarket?.m as string),
    queryFn: async () => await onFetchOrderBookData(currentMarket as Market),
    enabled: !!currentMarket,
    onError: onHandleError,
  });

  const onDataIncrement = useCallback(
    (payload: T.OrderbookRawUpdate[]) => {
      if (!data || !currentMarket?.m) return;
      let book = { ask: [...data.asks], bid: [...data.bids] };
      const incrementalData = payload;
      incrementalData.forEach((item) => {
        if (Number(item.qty) === 0) {
          book = deleteFromBook(book, item.price, item.side.toLowerCase());
        } else
          book = replaceOrAddToBook(
            book,
            item.price,
            item.qty,
            item.side.toLowerCase()
          );
      });

      queryClient.setQueryData(
        QUERY_KEYS.orderBook(currentMarket?.m as string),
        (oldData) => {
          const oldOrderbookData = oldData as T.OrderBookState["depth"];
          const newData = {
            ...oldOrderbookData,
            asks: _.cloneDeep(book.ask),
            bids: _.cloneDeep(book.bid),
          };
          return newData;
        }
      );
    },
    [currentMarket?.m, data, queryClient]
  );

  const formatOrderBookData = (
    data: T.OrderBookDbState[]
  ): T.OrderBookDbState[] => {
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
      const subscription = API.graphql<
        GraphQLSubscription<Websocket_streamsSubscription>
      >({
        query: subscriptions.websocket_streams,
        variables: { name: `${currentMarket.m}-ob-inc` },
        authToken: READ_ONLY_TOKEN,
      }).subscribe({
        next: (resp) => {
          if (!resp?.value?.data?.websocket_streams) return;
          const msg = resp.value.data.websocket_streams.data;
          const data: T.OrderbookRawUpdate[] = formatOrderbookUpdate(msg);
          onDataIncrement(data);
        },
        error: (err) => console.log(err),
      });
      return () => subscription.unsubscribe();
    }
  }, [currentMarket?.m, onDataIncrement]);

  return (
    <Provider
      value={{
        depth: {
          asks: data?.asks ?? [],
          bids: data?.bids ?? [],
          loading: isLoading || isFetching,
        },
      }}
    >
      {children}
    </Provider>
  );
};
