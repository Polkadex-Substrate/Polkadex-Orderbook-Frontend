import { useQuery, UseQueryResult } from "react-query";
import { useEffect, useState } from "react";

import { fetchKlineAsync } from "@polkadex/orderbook/modules/public/kline/sagas/handleKlineFetchSaga";
import { KlineEvent } from "@polkadex/orderbook-modules";

export const useMiniGraph = (market: string, from: Date, to: Date) => {
  const [points, setPoints] = useState([]);
  const dailyKline: UseQueryResult<KlineEvent[], Error> = useQuery(
    `mini-graph-${market}`,
    () => fetchKlineAsync(market, "1D", from, to)
  );
  useEffect(() => {
    if (dailyKline.isFetched) {
      const points: number[] = dailyKline.data.map((i) => Number(i.close));
      setPoints(points);
    }
  }, [dailyKline.isFetched]);
  return {
    graphPoints: points,
  };
};
