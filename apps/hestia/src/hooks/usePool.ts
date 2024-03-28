import { useNativeApi } from "@orderbook/core/providers/public/nativeApi";
import { SwapApi } from "@polkadex/polkadex-api";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const MINIMUM_PDEX_REQUIRED = 1.5;
export const usePool = ({ assetId }: { assetId: string }) => {
  const { api } = useNativeApi();

  const swapConnection = useMemo(() => (api ? new SwapApi(api) : null), [api]);
  const enableQuery = useMemo(
    () => !!assetId && !!swapConnection,
    [assetId, swapConnection]
  );

  const {
    data: poolReserves,
    isLoading: poolReservesLoading,
    isSuccess: poolReservesSuccess,
  } = useQuery({
    queryKey: ["poolReserves", !!swapConnection, assetId],
    enabled: enableQuery,
    queryFn: async () => {
      if (swapConnection)
        return await swapConnection?.getReserves("PDEX", assetId);
    },
    onError: (e) => console.log("Error", e),
  });

  const hasReserve = useMemo(
    () => (poolReserves?.base ?? 0) >= MINIMUM_PDEX_REQUIRED,
    [poolReserves?.base]
  );

  const enableQuotePrice = useMemo(
    () => poolReservesSuccess && !!enableQuery && hasReserve,
    [poolReservesSuccess, enableQuery, hasReserve]
  );

  const { data: swapPrice, isLoading: swapLoading } = useQuery({
    queryKey: ["quotePrice", !!swapConnection, enableQuotePrice, assetId],
    enabled: enableQuotePrice,
    queryFn: async () => {
      if (swapConnection) {
        const res = await swapConnection?.quotePriceTokensForExactTokens(
          assetId,
          "PDEX",
          MINIMUM_PDEX_REQUIRED
        );
        return res.toFixed(4);
      }
    },
    onError: (e) => console.log("Error", e),
  });

  return {
    swapPrice,
    swapLoading,
    hasReserve,
    poolReservesLoading,
  };
};
