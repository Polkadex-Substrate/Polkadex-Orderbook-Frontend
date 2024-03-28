import { useQuery } from "@tanstack/react-query";
import { useNativeApi } from "@orderbook/core/providers/public/nativeApi";

import { EVM_TOKENS, QUERY_KEYS } from "../constants";

import { useAssets } from "./useAssets";

export const MINIMUM_PDEX_REQUIRED = 1.5;
export const usePool = () => {
  const { assets } = useAssets();
  const { api, swapApi } = useNativeApi();

  const enabled = !!api && api?.isConnected && !!swapApi && assets.length > 0;

  const { data: poolReserves, isLoading: poolReservesLoading } = useQuery({
    queryKey: QUERY_KEYS.poolReserves(String(swapApi)),
    enabled,
    queryFn: async () => {
      if (!api?.isConnected || !swapApi) return;

      const res = assets.map(async (asset) => {
        const poolReserve = await swapApi?.getReserves("PDEX", asset.id);

        return {
          ...poolReserve,
          ticker: asset.ticker,
          assetId: asset.id,
          isEvm: EVM_TOKENS.includes(asset.ticker),
          hasReserve: (poolReserve?.base ?? 0) >= MINIMUM_PDEX_REQUIRED,
        };
      });

      return (await Promise.all(res)).sort((x, y) =>
        x.hasReserve === y.hasReserve ? 0 : x.hasReserve ? -1 : 1
      );
    },
    onError: (e) => console.log("Error", e),
  });

  return {
    poolReserves,
    poolReservesLoading,
  };
};
