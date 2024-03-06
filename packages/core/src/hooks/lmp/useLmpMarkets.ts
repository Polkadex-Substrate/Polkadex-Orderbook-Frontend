import { useNativeApi } from "@orderbook/core/providers/public/nativeApi";
import { useQuery } from "@tanstack/react-query";
import { useProfile } from "@orderbook/core/providers/user/profile";
import { Market, Ticker } from "@orderbook/core/utils/orderbookService";

import { LmpMarketConfig, QUERY_KEYS, useMarkets, useTickers } from "../..";

export const useLmpMarkets = () => {
  const { api, lmp } = useNativeApi();
  const {
    selectedAddresses: { mainAddress },
  } = useProfile();
  const { list: allMarkets } = useMarkets();
  const { tickers: allTickers } = useTickers();

  const enabled =
    !!api &&
    api?.isConnected &&
    !!lmp &&
    allMarkets?.length > 0 &&
    allTickers?.length > 0;

  const { data, status } = useQuery({
    queryKey: QUERY_KEYS.lmpMarkets(mainAddress),
    queryFn: async () => {
      if (!api?.isConnected || !lmp) return [];

      const currentEpoch = await lmp.queryCurrentEpoch();
      const markets = await lmp.queryAllMarkets(currentEpoch);

      const res = markets.map(async (m) => {
        const baseId = m.base === "polkadex" ? "PDEX" : m.base;
        const quoteId = m.quote === "polkadex" ? "PDEX" : m.quote;

        const market = allMarkets.find(
          (e) => e.baseAsset.id === baseId && e.quoteAsset.id === quoteId
        );

        const ticker = allTickers.find(
          (e) => e.market === `${baseId}-${quoteId}`
        );

        const rewards = await lmp.getEligibleRewards(
          currentEpoch,
          market?.id as string,
          mainAddress
        );

        // Fetch market score later
        return {
          ...(market as Market),
          ...(ticker as Ticker),
          score: "------",
          rewards,
        } as LmpMarketConfig;
      });

      return await Promise.all(res);
    },
    enabled,
  });

  return { markets: data, isLoading: status === "loading" };
};
