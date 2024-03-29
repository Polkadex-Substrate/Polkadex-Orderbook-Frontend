import { useNativeApi } from "@orderbook/core/providers/public/nativeApi";
import { SwapApi } from "@polkadex/polkadex-api";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { useAssets } from "@orderbook/core/index";

export const usePool = ({
  asset,
  amount,
}: {
  asset: string;
  amount: number;
}) => {
  const { api } = useNativeApi();
  const { assets } = useAssets();

  const swapConnection = useMemo(() => (api ? new SwapApi(api) : null), [api]);
  const enableQuery = useMemo(
    () => !!assets && !!swapConnection,
    [assets, swapConnection]
  );

  const handleSwapReserve = useCallback(
    async (assetId: string) =>
      await swapConnection?.getReserves("PDEX", assetId),
    [swapConnection]
  );

  const { data: poolReserves, isSuccess: poolReservesSuccess } = useQuery({
    queryKey: ["poolReserves", !!swapConnection, assets.length],
    enabled: enableQuery,
    queryFn: async () => {
      if (swapConnection) {
        const results = await Promise.all(
          assets.map(async (e) => {
            if (e.id === "PDEX")
              return {
                name: e.ticker,
                id: e.id,
                poolReserve: 1,
              };
            else {
              const reserve = await handleSwapReserve(e.id);
              return {
                name: e.ticker,
                id: e.id,
                poolReserve: reserve?.base,
              };
            }
          })
        );

        return results.sort(
          (a, b) => Number(b.poolReserve) - Number(a.poolReserve)
        );
      }
    },
    onError: (e) => console.log("Error", e),
  });

  const enableQuotePrice = useMemo(
    () => poolReservesSuccess && !!enableQuery && !!asset,
    [poolReservesSuccess, enableQuery, asset]
  );

  const { data: swapPrice, isLoading: swapLoading } = useQuery({
    queryKey: ["quotePrice", !!swapConnection, enableQuotePrice, asset, amount],
    enabled: enableQuotePrice,
    queryFn: async () => {
      if (swapConnection && asset) {
        const res = await swapConnection?.quotePriceTokensForExactTokens(
          asset,
          "PDEX",
          amount
        );
        return res;
      }
    },
    onError: (e) => console.log("Error", e),
  });

  return {
    poolReserves,
    poolReservesSuccess,
    swapPrice,
    swapLoading,
  };
};
