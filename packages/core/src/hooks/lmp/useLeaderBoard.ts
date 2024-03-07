import { useNativeApi } from "@orderbook/core/providers/public/nativeApi";
import { useQuery } from "@tanstack/react-query";
import { LmpLeaderboard, QUERY_KEYS } from "@orderbook/core";

export const useLeaderBoard = (market: string) => {
  const { api, lmp } = useNativeApi();
  const enabled = !!api && api?.isConnected && !!lmp && market?.length > 0;

  const { data, status } = useQuery({
    queryKey: QUERY_KEYS.lmpLeaderboard(market),
    queryFn: async () => {
      if (!api?.isConnected || !lmp) return;
      const currentEpoch = (await lmp.queryCurrentEpoch()) - 1;
      const accounts = await lmp.getTopAccounts(currentEpoch, market);

      const res = accounts.map(async (address, i): Promise<LmpLeaderboard> => {
        const reward = await lmp.getEligibleRewards(
          Math.max(0, currentEpoch), // Must be non-zero always
          market,
          address
        );
        const totalReward = reward.marketMaking + reward.trading;

        // TODO: Add score later
        return {
          rank: i + 1,
          address,
          rewards: totalReward,
          score: "----",
          token: "PDEX",
        };
      });

      return await Promise.all(res);
    },
    enabled,
  });

  return {
    accounts: data,
    isLoading: status === "loading",
  };
};
