import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { setToStorage } from "@orderbook/core/helpers";
import { defaultConfig } from "@orderbook/core/config";

import { LOCAL_STORAGE_ID, QUERY_KEYS } from "../constants";
import { useSettingsProvider } from "../providers/public/settings";
import { appsyncOrderbookService, Market } from "../utils/orderbookService";

export function useMarketsData(defaultMarket?: string) {
  const { onHandleError } = useSettingsProvider();

  const { data, isLoading: isMarketsLoading } = useQuery<Market[]>({
    queryKey: QUERY_KEYS.markets(),
    queryFn: async () => await appsyncOrderbookService.query.getMarkets(),
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : (error as string);
      onHandleError(errorMessage);
    },
  });

  const markets = useMemo(() => {
    return data?.filter(
      (market) =>
        !defaultConfig.blockedAssets.some(
          (item) => item === market.baseAsset.id
        ) &&
        !defaultConfig.blockedAssets.some(
          (item) => item === market.quoteAsset.id
        )
    );
  }, [data]);

  const currentMarket = useMemo(() => {
    if (markets?.length && defaultMarket) {
      const findMarket = markets?.find((v) =>
        v.name
          .replace(/[^a-zA-Z0-9]/g, "")
          .toLowerCase()
          .includes(defaultMarket.toLowerCase())
      );
      const defaultMarketSelected = findMarket ?? markets[0];
      setToStorage(LOCAL_STORAGE_ID.DEFAULT_MARKET, defaultMarketSelected.id);

      return defaultMarketSelected;
    }
  }, [defaultMarket, markets]);

  return {
    list: markets ?? [],
    loading: isMarketsLoading,
    currentMarket,
  };
}
