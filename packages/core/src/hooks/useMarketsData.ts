import { useMemo } from "react";
import { defaultConfig } from "@orderbook/core/config";

import { useOrderbookService } from "../providers/public/orderbookServiceProvider/useOrderbookService";

export function useMarketsData() {
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

  return {
    list: markets,
    loading: !isReady,
  };
}
