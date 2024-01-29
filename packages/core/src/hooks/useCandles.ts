import { useQuery } from "@tanstack/react-query";

import { useOrderbookService } from "../providers/public/orderbookServiceProvider/useOrderbookService";

export const useCandles = (market: string) => {
  const { isReady } = useOrderbookService();

  const enabled = isReady && market?.length > 0;

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["abcd"],
    queryFn: () => {},
    enabled,
  });

  return {
    candles: data,
    isLoading: isLoading || isFetching,
  };
};
