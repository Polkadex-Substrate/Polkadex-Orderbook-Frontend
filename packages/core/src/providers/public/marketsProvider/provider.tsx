// TODO: Improve this provider, The market should come through the query, there shouldn't be redirection based on the market

import { useEffect, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "aws-amplify";
import { useRouter } from "next/router";
import { GraphQLSubscription } from "@aws-amplify/api";
import * as subscriptions from "@orderbook/core/graphql/subscriptions";
import { defaultConfig } from "@orderbook/core/config";
import { Websocket_streamsSubscription } from "@orderbook/core/API";
import {
  convertToTicker,
  buildFilterPrice,
  setToStorage,
} from "@orderbook/core/helpers";
import {
  LOCAL_STORAGE_ID,
  QUERY_KEYS,
  READ_ONLY_TOKEN,
} from "@orderbook/core/constants";
import { Asset } from "@orderbook/core/utils/orderbookService";
import { useAssets } from "@orderbook/core/hooks";

import { useSettingsProvider } from "../settings";

import { Market, MarketsComponent, Ticker, TickerQueryResult } from "./types";
import { defaultTickers } from "./reducer";
import { Provider } from "./context";
import { fetchMarketTickers, fetchMarkets } from "./helper";

export const MarketsProvider: MarketsComponent = ({ children }) => {
  const queryClient = useQueryClient();
  const { list: allAssets } = useAssets();
  const { onHandleError } = useSettingsProvider();

  const router = useRouter();
  const defaultMarket = router.query.id as string;

  const shouldFetchMarkets = Boolean(allAssets.length > 0);

  const { data: markets, isLoading: isMarketsLoading } = useQuery<Market[]>({
    queryKey: QUERY_KEYS.markets(),
    enabled: shouldFetchMarkets,
    queryFn: async () => await onMarketsFetch(allAssets),
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : (error as string);
      onHandleError(errorMessage);
    },
  });

  const shouldFetchTickers = Boolean(markets && markets?.length > 0);

  const { data: tickers, isLoading: isTickersLoading } = useQuery<Ticker[]>({
    queryKey: QUERY_KEYS.tickers(),
    enabled: shouldFetchTickers,
    queryFn: async () => await onMarketTickersFetch(),
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : (error as string);
      onHandleError(errorMessage);
    },
  });

  const onMarketsFetch = async (allAssets: Asset[]) => {
    if (allAssets.length > 0) {
      const markets = await fetchMarkets(allAssets);
      const validMarkets = markets.filter(
        (market) =>
          !defaultConfig.blockedAssets.some(
            (item) => item === market.baseAssetId
          ) &&
          !defaultConfig.blockedAssets.some(
            (item) => item === market.quoteAssetId
          )
      );
      return validMarkets;
    }
    return [];
  };

  const onMarketTickersFetch = async () => {
    if (!markets || markets?.length === 0) return [];

    const tickersPromises = markets.map((m) => fetchMarketTickers(m));
    return await Promise.all(tickersPromises);
  };

  const filters =
    markets?.reduce((result, market: Market) => {
      result[market.id] = result[market.id] || [];

      if (market.filters) {
        result[market.id] = market.filters.map(buildFilterPrice);
      }

      return result;
    }, {}) ?? {};

  const currentMarket = useMemo(() => {
    if (markets?.length && defaultMarket) {
      const findMarket = markets?.find((v) =>
        v.name
          .replace(/[^a-zA-Z0-9]/g, "")
          .toLowerCase()
          .includes(defaultMarket.toLowerCase())
      );
      const defaultMarketSelected = findMarket ?? markets[0];
      setToStorage(LOCAL_STORAGE_ID.DEFAULT_MARKET, defaultMarketSelected.m);

      return defaultMarketSelected;
    }
  }, [defaultMarket, markets]);

  const currentTicker = useMemo(() => {
    const currentTickerSelected = tickers?.find(
      (x) => x.m === currentMarket?.m
    );
    return currentTickerSelected ?? defaultTickers;
  }, [currentMarket?.m, tickers]);

  useEffect(() => {
    if (!currentMarket?.m) {
      return;
    }
    const subscription = API.graphql<
      GraphQLSubscription<Websocket_streamsSubscription>
    >({
      query: subscriptions.websocket_streams,
      variables: { name: currentMarket.m + "-ticker" },
      authToken: READ_ONLY_TOKEN,
    }).subscribe({
      next: (data) => {
        if (data?.value?.data?.websocket_streams?.data && currentMarket?.m) {
          const dataParsed: TickerQueryResult = JSON.parse(
            data.value.data.websocket_streams.data
          );

          const newTickerData: Ticker = convertToTicker(
            dataParsed,
            currentMarket.m
          );

          queryClient.setQueryData(
            QUERY_KEYS.tickers(),
            (prevData: Ticker[]) => {
              const newTickers = [...prevData];
              const idx = newTickers?.findIndex((x) => x.m === newTickerData.m);
              if (idx < 0) newTickers.push(newTickerData);
              else newTickers[idx] = newTickerData;
              return newTickers;
            }
          );
        }
      },
      error: (err) => {
        console.warn(err);
      },
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [currentMarket?.m, queryClient]);

  return (
    <Provider
      value={{
        /** Markets **/
        list: markets ?? [],
        loading: isMarketsLoading,
        filters,
        timestamp: Math.floor(Date.now() / 1000),
        currentMarket,

        /** Tickers **/
        tickers: tickers ?? [],
        tickerLoading: isTickersLoading,
        tickersTimestamp: Math.floor(Date.now() / 1000),
        currentTicker,
      }}
    >
      {children}
    </Provider>
  );
};
