import { useNativeApi } from "@orderbook/core/providers/public/nativeApi";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS, useAssets } from "@orderbook/core/index";

export const useQueryPools = () => {
  const { swap } = useNativeApi();
  const { assets } = useAssets();

  const {
    data: pools,
    isLoading: poolsLoading,
    isSuccess: poolsSuccess,
    error: poolsError,
  } = useQuery({
    queryKey: QUERY_KEYS.queryPools(),
    enabled: !!swap && !!assets,
    queryFn: async () => {
      if (!swap || !assets) return;
      let data = await swap.queryPools();
      // filter out pools with 0 liquidity
      data = data.filter((p) => Number(p.lpToken) === 0);
      return await Promise.all(
        data.map(async (e) => {
          const quote = assets.find(
            (val) => val.id.toLowerCase() === e.quote.toLowerCase()
          );
          const reserve = await swap.getReserves(e.base, e.quote);
          return {
            ...quote,
            reserve: reserve.quote,
          };
        })
      );
    },
  });

  return {
    pools,
    poolsLoading,
    poolsSuccess,
    poolsError,
  };
};
