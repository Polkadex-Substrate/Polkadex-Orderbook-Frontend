import _ from "lodash";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import {
  PublicTrade,
  appsyncOrderbookService,
  Order,
  MaybePaginated,
  PriceLevel,
} from "@orderbook/core/utils/orderbookService";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@orderbook/core/constants";
import { useOrderbookService } from "@orderbook/core/providers/public/orderbookServiceProvider/useOrderbookService";
import {
  deleteFromBook,
  getCurrentMarket,
  replaceOrAddToBook,
} from "@orderbook/core/helpers";
import {
  removeOrderFromList,
  replaceOrPushOrder,
} from "@orderbook/core/utils/orderbookService/appsync_v1/helpers";
import { useOrderbook } from "@orderbook/core/hooks";

import { useProfile } from "../profile";
import { useSettingsProvider } from "../../public/settings";
import { useSessionProvider } from "../sessionProvider";

import { Provider } from "./context";
import * as T from "./types";

export const SubscriptionProvider: T.SubscriptionComponent = ({ children }) => {
  const queryClient = useQueryClient();
  const path = usePathname();
  const router = useRouter();
  const { onHandleError } = useSettingsProvider();
  const { isReady, markets } = useOrderbookService();
  const { dateFrom, dateTo } = useSessionProvider();
  const {
    selectedAccount: { tradeAddress },
  } = useProfile();

  const isTradingPage = path.startsWith("/trading");
  const marketName = isTradingPage ? (router.query.id as string) : null;
  const market = getCurrentMarket(markets, marketName)?.id;

  const { asks, bids } = useOrderbook(market as string);

  const onOrderUpdates = useCallback(
    (payload: Order) => {
      try {
        // Update OpenOrders Realtime
        queryClient.setQueryData(
          QUERY_KEYS.openOrders(tradeAddress),
          (oldOpenOrders: Order[]) => {
            const prevOpenOrders = [...oldOpenOrders];

            let updatedOpenOrders: Order[] = [];
            if (payload.status === "OPEN") {
              updatedOpenOrders = replaceOrPushOrder(prevOpenOrders, payload);
            } else {
              // Remove from Open Orders if it is closed
              updatedOpenOrders = removeOrderFromList(prevOpenOrders, payload);
            }
            return updatedOpenOrders;
          }
        );

        // Update OrderHistory Realtime
        queryClient.setQueryData(
          QUERY_KEYS.orderHistory(dateFrom, dateTo, tradeAddress),
          (
            oldOrderHistory: InfiniteData<MaybePaginated<Order[]>> | undefined
          ) => {
            const prevOrderHistory = [
              ...(oldOrderHistory?.pages.flatMap((page) => page.data) ?? []),
            ];
            const oldOrderHistoryLength = oldOrderHistory
              ? oldOrderHistory?.pages.length
              : 0;

            const nextToken =
              oldOrderHistory?.pages?.at(oldOrderHistoryLength - 1)
                ?.nextToken || null;

            // Add to OrderHistory for all cases
            const updatedOrderHistory = replaceOrPushOrder(
              prevOrderHistory,
              payload
            );

            const newOrderHistory = {
              pages: [
                {
                  data: [...updatedOrderHistory],
                  nextToken,
                },
              ],
              pageParams: [...(oldOrderHistory?.pageParams ?? [])],
            };

            return newOrderHistory;
          }
        );
      } catch (error) {
        onHandleError(`Order updates channel ${error?.message ?? error}`);
      }
    },
    [dateFrom, dateTo, onHandleError, queryClient, tradeAddress]
  );

  const onRecentTradeUpdates = useCallback(
    (trade: PublicTrade) => {
      if (market) {
        queryClient.setQueryData(QUERY_KEYS.recentTrades(market), (oldData) => {
          const oldRecentTrades = oldData as PublicTrade[];
          return [trade, ...oldRecentTrades];
        });
      }
    },
    [market, queryClient]
  );

  const onOrderbookUpdates = useCallback(
    (payload: PriceLevel[]) => {
      if (!market) return;

      let book = {
        ask: [...asks],
        bid: [...bids],
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
    },
    [asks, bids, market, queryClient]
  );

  // Recent Trades subscription
  useEffect(() => {
    if (!isReady || !market) return;

    const subscription =
      appsyncOrderbookService.subscriber.subscribeLatestTrades(
        market,
        onRecentTradeUpdates
      );

    return () => subscription.unsubscribe();
  }, [isReady, market, onRecentTradeUpdates]);

  // Orderbook subscription
  useEffect(() => {
    if (!market || !isReady) return;

    const subscription = appsyncOrderbookService.subscriber.subscribeOrderbook(
      market,
      onOrderbookUpdates
    );
    return () => subscription.unsubscribe();
  }, [isReady, market, onOrderbookUpdates, queryClient]);

  // Open Orders & Order history subscription
  useEffect(() => {
    if (tradeAddress?.length && isReady) {
      const subscription = appsyncOrderbookService.subscriber.subscribeOrders(
        tradeAddress,
        onOrderUpdates
      );

      return () => subscription.unsubscribe();
    }
  }, [tradeAddress, onOrderUpdates, isReady]);

  return <Provider value={{}}>{children}</Provider>;
};
