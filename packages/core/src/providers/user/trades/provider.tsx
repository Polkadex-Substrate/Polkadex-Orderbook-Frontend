import { useCallback, useEffect } from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import { eventHandler } from "@orderbook/core/helpers";
import { QUERY_KEYS } from "@orderbook/core/constants";

import { useProfile } from "../profile";
import { useSessionProvider } from "../sessionProvider";
import { useMarketsProvider } from "../../public/marketsProvider";

import { Provider } from "./context";
import * as T from "./types";
import * as A from "./actions";
import { processTradeData, fetchUserTrades } from "./helper";

export const TradesProvider: T.TradesComponent = ({ children }) => {
  const queryClient = useQueryClient();
  const {
    selectedAccount: { tradeAddress },
  } = useProfile();
  const { onHandleError } = useSettingsProvider();
  const { dateFrom, dateTo } = useSessionProvider();

  const { currentMarket } = useMarketsProvider();

  const userLoggedIn = tradeAddress !== "";

  const shouldFetchTradeHistory = Boolean(
    userLoggedIn && currentMarket && tradeAddress
  );

  const { data, fetchNextPage, isLoading, isSuccess, hasNextPage } =
    useInfiniteQuery({
      queryKey: QUERY_KEYS.tradeHistory(dateFrom, dateTo, tradeAddress),
      enabled: shouldFetchTradeHistory,
      queryFn: async ({ pageParam = null }) => {
        return await onFetchTradesData({
          dateFrom,
          dateTo,
          tradeAddress,
          tradeHistoryFetchToken: pageParam,
        });
      },
      getNextPageParam: (lastPage) => {
        // If the last page contains nextToken as null, don't fetch the next page
        if (!lastPage.nextToken) {
          return false;
        }
        return lastPage.nextToken;
      },
    });

  const onFetchTradesData = async ({
    dateFrom,
    dateTo,
    tradeAddress,
    tradeHistoryFetchToken,
  }) => {
    if (tradeAddress) {
      const { trades, nextToken } = await fetchUserTrades(
        tradeAddress,
        dateFrom,
        dateTo,
        tradeHistoryFetchToken
      );
      return { data: [...trades], nextToken };
    }
    return { data: [], nextToken: null };
  };

  const onUserTradeUpdate = useCallback(
    (payload: A.UserTradesUpdateEvent["payload"]) => {
      try {
        const trade = processTradeData(payload);
        queryClient.setQueryData(
          QUERY_KEYS.tradeHistory(dateFrom, dateTo, tradeAddress),
          (oldTradeHistory: any) => {
            const payload = {
              data: [trade as A.UserTrade],
              nextToken: null,
            };
            return {
              pages: [payload, ...oldTradeHistory.pages],
              pageParams: [...oldTradeHistory.pageParams],
            };
          }
        );
      } catch (error) {
        onHandleError(`User trades channel error: ${error?.message ?? error}`);
      }
    },
    [onHandleError, queryClient, dateFrom, dateTo, tradeAddress]
  );

  useEffect(() => {
    if (tradeAddress) {
      const subscription = eventHandler({
        cb: onUserTradeUpdate,
        name: tradeAddress,
        eventType: "TradeFormat",
      });
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [tradeAddress, onUserTradeUpdate]);

  return (
    <Provider
      value={{
        data: data?.pages.flatMap((page) => page.data) ?? [],
        success: isSuccess,
        loading: isLoading,
        hasNextPage,
        onUserTradeUpdate,
        onFetchNextPage: fetchNextPage,
      }}
    >
      {children}
    </Provider>
  );
};
