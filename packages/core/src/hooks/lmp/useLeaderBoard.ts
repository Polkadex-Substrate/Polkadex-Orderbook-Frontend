import { useNativeApi } from "@orderbook/core/providers/public/nativeApi";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@orderbook/core";

export const useLeaderBoard = (market: string) => {
  const { api, lmp } = useNativeApi();
  const enabled = !!api && api?.isConnected && !!lmp;

  const { data, status } = useQuery({
    queryKey: QUERY_KEYS.lmpLeaderboard(market),
    queryFn: async () => {
      if (!api?.isConnected || !lmp) return;
      const currentEpoch = await lmp.queryCurrentEpoch();
      const accounts = await lmp.getTopAccounts(currentEpoch, market);
      return accounts;
    },
    enabled,
  });

  return {
    accounts: data,
    isLoading: status === "loading",
  };
};
