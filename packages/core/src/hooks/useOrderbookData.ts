import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import _ from "lodash";

import { QUERY_KEYS } from "../constants";
import { PriceLevel, appsyncOrderbookService } from "../utils/orderbookService";
import { deleteFromBook, replaceOrAddToBook } from "../helpers";
import { useOrderbookService } from "../providers/public/orderbookServiceProvider/useOrderbookService";

export function useOrderbookData(market: string) {
  const queryClient = useQueryClient();
  const { isReady } = useOrderbookService();
  const { onHandleError } = useSettingsProvider();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: QUERY_KEYS.orderBook(market),
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

  useEffect(() => {
    if (!market || !isReady) return;

    const subscription = appsyncOrderbookService.subscriber.subscribeOrderbook(
      market,
      (payload: PriceLevel[]) => {
        let book = {
          ask: [...(data?.asks ?? [])],
          bid: [...(data?.bids ?? [])],
        };

        const incrementalData = payload;
        incrementalData.forEach((item) => {
          if (Number(item.qty) === 0) {
            book = deleteFromBook(
              book,
              String(item.price),
              item.side.toLowerCase()
            );
          } else
            book = replaceOrAddToBook(
              book,
              String(item.price),
              String(item.qty),
              item.side.toLowerCase()
            );
        });

        queryClient.setQueryData(QUERY_KEYS.orderBook(market), () => {
          const newData = {
            asks: _.cloneDeep(book.ask),
            bids: _.cloneDeep(book.bid),
          };
          return newData;
        });
      }
    );
    return () => subscription.unsubscribe();
  }, [data?.asks, data?.bids, queryClient, market, isReady]);

  return {
    depth: {
      asks: data?.asks ?? [],
      bids: data?.bids ?? [],
      loading: isLoading || isFetching,
    },
  };
}
