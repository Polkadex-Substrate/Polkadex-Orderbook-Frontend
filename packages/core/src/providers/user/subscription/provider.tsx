import { useEffect } from "react";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import {
  PublicTrade,
  appsyncOrderbookService,
} from "@orderbook/core/utils/orderbookService";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@orderbook/core/constants";
import { useOrderbookService } from "@orderbook/core/providers/public/orderbookServiceProvider/useOrderbookService";
import { getCurrentMarket } from "@orderbook/core/helpers";

import { useProfile } from "../profile";

import { Provider } from "./context";
import * as T from "./types";

export const SubscriptionProvider: T.SubscriptionComponent = ({ children }) => {
  const queryClient = useQueryClient();
  const path = usePathname();
  const router = useRouter();
  const { isReady, markets } = useOrderbookService();
  const {
    selectedAccount: { tradeAddress, mainAddress },
  } = useProfile();

  const isTradingPage = path.startsWith("/trading");
  const marketName = isTradingPage ? (router.query.id as string) : null;
  const market = getCurrentMarket(markets, marketName)?.id;

  // Recent trades subscription
  useEffect(() => {
    if (!isReady || !market || market?.length <= 0) return;

    const subscription =
      appsyncOrderbookService.subscriber.subscribeLatestTrades(
        market,
        (trade: PublicTrade) => {
          queryClient.setQueryData(
            QUERY_KEYS.recentTrades(market),
            (oldData) => {
              const oldRecentTrades = oldData as PublicTrade[];
              return [trade, ...oldRecentTrades];
            }
          );
        }
      );

    return () => subscription.unsubscribe();
  }, [isReady, market, queryClient]);

  return <Provider value={{}}>{children}</Provider>;
};
