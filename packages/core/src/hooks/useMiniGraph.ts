import { useQuery, UseQueryResult } from "react-query";
import { useEffect, useState } from "react";
import { fetchKlineAsync } from "@orderbook/core/helpers";
import { KlineEvent } from "@orderbook/core/providers/public/klineProvider";

export const useMiniGraph = (market: string, from: Date, to: Date) => {
  const [points, setPoints] = useState<number[]>([]);
  const len = points?.length;
  const isIncreasing = !!len ?? points[len - 2] < points[len - 1];
  const dailyKline: UseQueryResult<KlineEvent[], Error> = useQuery(
    `mini-graph-${market}`,
    () => fetchKlineAsync(market, "1D", from, to),
    {
      refetchOnWindowFocus: false,
    },
  );
  useEffect(() => {
    if (dailyKline?.data && dailyKline.isFetched) {
      const points = dailyKline.data.map((i) => Number(i.close));
      setPoints(points);
    }
  }, [dailyKline?.data, dailyKline.isFetched]);

  return {
    graphPoints: points,
    isIncreasing,
  };
};
