import { useQuery } from "@tanstack/react-query";
import { useProfile } from "@orderbook/core/providers/user/profile";
import { useNativeApi } from "@orderbook/core/providers/public/nativeApi";

import { QUERY_KEYS } from "../..";

export const useTraderMetrics = (market: string) => {
  const { api, lmp } = useNativeApi();
  const {
    selectedAddresses: { mainAddress },
  } = useProfile();

  const enabled = !!api && api?.isConnected && !!lmp && market?.length > 0;

  const { data, status } = useQuery({
    queryKey: QUERY_KEYS.traderMetrics(mainAddress),
    queryFn: async () => {
      if (!api?.isConnected || !lmp) return;

      const currentEpoch = await lmp.queryCurrentEpoch();
      const traderMetrics = await lmp.getTraderMetrics(
        currentEpoch,
        market,
        mainAddress
      );
      return traderMetrics;
    },
    enabled,
  });

  return { tradeMetrics: data, isLoading: status === "loading" };
};
