import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "../constants";

import { useTickers } from "./useTickers";
import { useCandles } from "./useCandles";

export const useMiniGraph = (market: string, from: Date, to: Date) => {
  const { fetchCandles } = useCandles();

  const dailyKline = useQuery({
    queryKey: QUERY_KEYS.miniGraph(market),
    queryFn: () => fetchCandles({ market, resolution: "2h", from, to }),
    refetchOnWindowFocus: false,
  });

  const {
    currentTicker: { priceChange24Hr },
  } = useTickers(market);
  const isPriceChangeNegative = priceChange24Hr < 0;
  const isIncreasing = !isPriceChangeNegative;

  const points = dailyKline?.data?.map((i) => i.close) || [];

  return {
    graphPoints: points,
    isIncreasing,
  };
};
