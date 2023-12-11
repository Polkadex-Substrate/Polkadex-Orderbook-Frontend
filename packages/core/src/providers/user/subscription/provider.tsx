import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import {
  PublicTrade,
  appsyncOrderbookService,
  Order,
} from "@orderbook/core/utils/orderbookService";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@orderbook/core/constants";
import { useOrderbookService } from "@orderbook/core/providers/public/orderbookServiceProvider/useOrderbookService";
import { getCurrentMarket } from "@orderbook/core/helpers";
import {
  removeOrderFromList,
  replaceOrPushOrder,
} from "@orderbook/core/utils/orderbookService/appsync_v1/helpers";

import { useProfile } from "../profile";
import { useSettingsProvider } from "../../public/settings";

import { Provider } from "./context";
import * as T from "./types";

export const SubscriptionProvider: T.SubscriptionComponent = ({ children }) => {
  const queryClient = useQueryClient();
  const path = usePathname();
  const router = useRouter();
  const { onHandleError } = useSettingsProvider();
  const { isReady, markets } = useOrderbookService();
  const {
    selectedAccount: { tradeAddress },
  } = useProfile();

  const isTradingPage = path.startsWith("/trading");
  const marketName = isTradingPage ? (router.query.id as string) : null;
  const market = getCurrentMarket(markets, marketName)?.id;

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
      } catch (error) {
        onHandleError(`Order updates channel ${error?.message ?? error}`);
      }
    },
    [onHandleError, queryClient, tradeAddress]
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

  // Recent Trades subscription
  useEffect(() => {
    if (!isReady || !market || market?.length <= 0) return;

    const subscription =
      appsyncOrderbookService.subscriber.subscribeLatestTrades(
        market,
        onRecentTradeUpdates
      );

    return () => subscription.unsubscribe();
  }, [isReady, market, onRecentTradeUpdates]);

  // Open Orders subscription
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
