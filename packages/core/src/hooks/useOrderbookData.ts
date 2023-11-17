import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "../constants";
import { appsyncOrderbookService } from "../utils/orderbookService";

export function useOrderbookData(market: string) {
  const { onHandleError } = useSettingsProvider();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: QUERY_KEYS.orderBook(market as string),
    queryFn: async () => {
      const orderbook =
        await appsyncOrderbookService.query.getOrderbook(market);

      const bids = orderbook.bids.map((bid) => {
        return [String(bid.price), String(bid.qty)];
      });
      bids.sort((a, b) => Number(a[0]) - Number(b[0]));
      const asks = orderbook.asks.map((ask) => {
        return [String(ask.price), String(ask.qty)];
      });
      asks.sort((a, b) => Number(a[0]) - Number(b[0]));

      return { bids, asks };
    },
    enabled: Boolean(market?.length > 0),
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : (error as string);
      onHandleError(errorMessage);
    },
  });

  return {
    depth: {
      asks: data?.asks ?? [],
      bids: data?.bids ?? [],
      loading: isLoading || isFetching,
    },
  };
}
