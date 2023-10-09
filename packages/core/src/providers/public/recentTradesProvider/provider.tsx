import { useCallback, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "aws-amplify";
import { GraphQLSubscription } from "@aws-amplify/api";
import * as subscriptions from "@orderbook/core/graphql/subscriptions";
import { getRecentTrades } from "@orderbook/core/graphql/queries";
import { defaultConfig } from "@orderbook/core/config";
import {
  fetchFromAppSync,
  decimalPlaces,
  getIsDecreasingArray,
  sliceArray,
} from "@orderbook/core/helpers";
import { QUERY_KEYS, READ_ONLY_TOKEN } from "@orderbook/core/constants";
import { Websocket_streamsSubscription } from "@orderbook/core/API";

import { useMarketsProvider, Market } from "../marketsProvider";
import { useSettingsProvider } from "../settings";

import { Provider } from "./context";
import * as T from "./types";
import { PublicTrade } from "./types";

export const RecentTradesProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const { onHandleError } = useSettingsProvider();
  const { currentMarket } = useMarketsProvider();

  const fetchRecentTrade = useCallback(
    async (market: string, limit = 30): Promise<T.RawTrades[]> => {
      const { response: res } = await fetchFromAppSync(
        getRecentTrades,
        { m: market, limit },
        "getRecentTrades"
      );
      return res;
    },
    []
  );

  const onFetchRecentTrades = async (market: Market) => {
    if (!market) return [];

    const res = await fetchRecentTrade(market.m);
    const trades: T.PublicTrade[] = res.map((x) => ({
      market_id: market.m,
      price: x.p,
      amount: x.q,
      timestamp: Number(x.t),
    }));

    return sliceArray(trades, defaultConfig.defaultStorageLimit);
  };

  const {
    data: recentTradesList,
    isLoading,
    isFetching,
  } = useQuery<T.PublicTrade[]>({
    queryKey: QUERY_KEYS.recentTrades(currentMarket?.m as string),
    enabled: !!currentMarket?.m,
    queryFn: async () => await onFetchRecentTrades(currentMarket as Market),
    onError: onHandleError,
    initialData: [],
  });

  const isDecreasing = getIsDecreasingArray(recentTradesList);

  const getCurrentTradePrice = (): string => {
    if (!recentTradesList) return "0";
    return recentTradesList.length > 0 ? recentTradesList[0].price : "0";
  };

  const getLastTradePrice = () => {
    if (!recentTradesList) return "0";
    return recentTradesList.length > 1 ? recentTradesList[1].price : "0";
  };

  useEffect(() => {
    const subscription = API.graphql<
      GraphQLSubscription<Websocket_streamsSubscription>
    >({
      query: subscriptions.websocket_streams,
      variables: { name: `${currentMarket?.m}-recent-trades` },
      authToken: READ_ONLY_TOKEN,
    }).subscribe({
      next: (data) => {
        if (!data?.value?.data?.websocket_streams?.data) return;
        const val: T.RawTradeEvent = JSON.parse(
          data.value.data.websocket_streams.data
        );
        const trade: PublicTrade = {
          price: val.p,
          amount: val.q,
          market_id: val.m,
          timestamp: Number(val.t),
        };

        queryClient.setQueryData(
          QUERY_KEYS.recentTrades(currentMarket?.m as string),
          (oldData) => {
            const oldRecentTrades = oldData as T.PublicTrade[];
            return sliceArray(
              [trade, ...oldRecentTrades],
              defaultConfig.defaultStorageLimit
            );
          }
        );
      },
      error: (err) => console.warn(err),
    });

    return () => {
      return subscription.unsubscribe();
    };
  }, [currentMarket?.m, queryClient]);

  return (
    <Provider
      value={{
        list: recentTradesList,
        loading: isLoading || isFetching,
        currentTrade: recentTradesList.at(0),
        lastTrade: recentTradesList.at(1),
        isDecreasing,
        quoteUnit: currentMarket?.quote_ticker,
        baseUnit: currentMarket?.base_ticker,
        pricePrecision: currentMarket
          ? decimalPlaces(currentMarket.price_tick_size)
          : undefined,
        amountPrecision: currentMarket
          ? decimalPlaces(currentMarket.qty_step_size)
          : undefined,
        getCurrentTradePrice,
        getLastTradePrice,
      }}
    >
      {children}
    </Provider>
  );
};
