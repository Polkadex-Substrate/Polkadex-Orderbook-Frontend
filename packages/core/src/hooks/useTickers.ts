import _ from "lodash";
import { useMemo, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS, defaultTicker } from "../constants";
import { useSettingsProvider } from "../providers/public/settings";
import { useOrderbookService } from "../providers/public/orderbookServiceProvider/useOrderbookService";
import { appsyncOrderbookService, Ticker } from "../utils/orderbookService";
import { decimalPlaces } from "../helpers";

export function useTickers(defaultMarket?: string) {
  const queryClient = useQueryClient();
  const { isReady, markets } = useOrderbookService();
  const { onHandleError } = useSettingsProvider();

  const shouldFetchTickers = Boolean(markets && markets?.length > 0);

  const { data: tickers, isLoading: isTickersLoading } = useQuery({
    queryKey: QUERY_KEYS.tickers(),
    enabled: shouldFetchTickers,
    queryFn: async () => {
      const tickersPromises = markets.map(({ id }) =>
        appsyncOrderbookService.query.getTicker(id)
      );
      const tickersData = await Promise.all(tickersPromises);

      return tickersData.map((item) => {
        const priceChange = Number(item.close) - Number(item.open);
        const priceChangePercent = (priceChange / Number(item.open)) * 100;

        const market = markets?.find((market) => market.id === item.market);

        const pricePrecision = decimalPlaces(market?.price_tick_size || 0);

        const priceChange24Hr = _.round(priceChange, pricePrecision);
        const priceChangePercent24Hr = _.round(
          isNaN(priceChangePercent) ? 0 : priceChangePercent,
          pricePrecision
        );

        return {
          ...item,
          priceChange24Hr,
          priceChangePercent24Hr,
        };
      });
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : (error as string);
      onHandleError(errorMessage);
    },
  });

  const currentTicker = useMemo(() => {
    const currentTickerSelected = tickers?.find(
      (x) => x.market === defaultMarket
    );
    return (
      currentTickerSelected ?? {
        ...defaultTicker,
        priceChange24Hr: 0,
        priceChangePercent24Hr: 0,
      }
    );
  }, [defaultMarket, tickers]);

  useEffect(() => {
    if (!defaultMarket || !isReady) return;

    const subscription = appsyncOrderbookService.subscriber.subscribeTicker(
      defaultMarket,
      (ticker: Ticker) => {
        queryClient.setQueryData(QUERY_KEYS.tickers(), (prevData: Ticker[]) => {
          const newTickers = [...prevData];
          const idx = newTickers?.findIndex((x) => x.market === ticker.market);

          const priceChange = Number(ticker.close) - Number(ticker.open);
          const priceChangePercent = (priceChange / Number(ticker.open)) * 100;
          const market = markets?.find((market) => market.id === ticker.market);
          const pricePrecision = decimalPlaces(market?.price_tick_size || 0);

          const priceChange24Hr = _.round(priceChange, pricePrecision);
          const priceChangePercent24Hr = _.round(
            isNaN(priceChangePercent) ? 0 : priceChangePercent,
            pricePrecision
          );

          const newTickersData = {
            ...ticker,
            priceChange24Hr,
            priceChangePercent24Hr,
          };

          if (idx < 0) newTickers.push(newTickersData);
          else newTickers[idx] = newTickersData;
          return newTickers;
        });
      }
    );

    return () => subscription.unsubscribe();
  }, [defaultMarket, queryClient, markets, isReady]);

  return {
    tickers: tickers ?? [],
    tickerLoading: isTickersLoading,
    currentTicker,
  };
}
