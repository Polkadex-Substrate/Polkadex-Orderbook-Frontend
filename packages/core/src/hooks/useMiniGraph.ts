import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetchKlineAsync } from "@orderbook/core/helpers";
import { KlineEvent } from "@orderbook/core/providers/public/klineProvider";

import { QUERY_KEYS } from "../constants";

import { useTickers } from "./useTickers";

export const useMiniGraph = (market: string, from: Date, to: Date) => {
  const dailyKline: UseQueryResult<KlineEvent[], Error> = useQuery({
    queryKey: QUERY_KEYS.miniGraph(market),
    queryFn: () => fetchKlineAsync(market, "2h", from, to),
    refetchOnWindowFocus: false,
  });

  const {
    currentTicker: { priceChange24Hr },
  } = useTickers(market);
  const isPriceChangeNegative = priceChange24Hr < 0;
  const isIncreasing = !isPriceChangeNegative;

  const points = dailyKline?.data?.map((i) => i.close) || [];

  return {
    graphPoints: points.reverse(),
    isIncreasing,
  };
};
