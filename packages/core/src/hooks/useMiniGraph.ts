import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "../constants";
import { fetchCandles } from "../helpers";

import { useTickers } from "./useTickers";

export const useMiniGraph = (market: string, from: Date, to: Date) => {
  const { data: dailyKline } = useQuery({
    queryKey: QUERY_KEYS.miniGraph(market),
    queryFn: () => fetchCandles({ market, resolution: "2h", from, to }),
    refetchOnWindowFocus: false,
  });

  const {
    currentTicker: { priceChange24Hr },
  } = useTickers(market);
  const isPriceChangeNegative = priceChange24Hr < 0;
  const isIncreasing = !isPriceChangeNegative;

  const points = dailyKline?.map((i) => i.close) || [];

  return {
    graphPoints: points,
    isIncreasing,
  };
};
