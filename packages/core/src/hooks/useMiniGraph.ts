import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetchKlineAsync } from "@orderbook/core/helpers";
import { KlineEvent } from "@orderbook/core/providers/public/klineProvider";

import { QUERY_KEYS } from "../constants";

export const useMiniGraph = (market: string, from: Date, to: Date) => {
  const dailyKline: UseQueryResult<KlineEvent[], Error> = useQuery({
    queryKey: QUERY_KEYS.miniGraph(market),
    queryFn: () => fetchKlineAsync(market, "2h", from, to),
    refetchOnWindowFocus: false,
  });

  const points = dailyKline?.data?.map((i) => i.close) || [];
  const isIncreasing = points?.length > 1 ? points[0] > points[1] : false;

  return {
    graphPoints: points.reverse(),
    isIncreasing,
  };
};
