import { useMemo } from "react";
import { setToStorage } from "@orderbook/core/helpers";
import { defaultConfig } from "@orderbook/core/config";

import { LOCAL_STORAGE_ID } from "../constants";
import { useOrderbookService } from "../providers/public/orderbookServiceProvider/useOrderbookService";

export function useMarketsData(defaultMarket?: string) {
  const { markets: data, isReady } = useOrderbookService();

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
    list: markets,
    loading: !isReady,
    currentMarket,
  };
}
