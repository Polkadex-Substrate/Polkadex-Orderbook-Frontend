import { useCallback, useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
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
  const { selectedAccount } = useProfile();
  const { mainAddress } = selectedAccount;
  const { onHandleError } = useSettingsProvider();
  const { dateFrom, dateTo } = useSessionProvider();

  const { currentMarket } = useMarketsProvider();

  const userLoggedIn = selectedAccount.tradeAddress !== "";

  const shouldFetchTradeHistory = Boolean(
    userLoggedIn && currentMarket && selectedAccount.tradeAddress
  );

  const [tradeHistoryList, setTradeHistoryList] = useState<A.UserTrade[]>([]);
  const [tradeHistoryFetchToken, setTradeHistoryFetchToken] = useState<
    string | null
  >(null);

  const { data, fetchNextPage, isLoading, isSuccess } = useInfiniteQuery({
    queryKey: QUERY_KEYS.tradeHistory(
      dateFrom,
      dateTo,
      selectedAccount.tradeAddress
    ),
    enabled: shouldFetchTradeHistory,
    queryFn: async ({ pageParam = 0 }) => {
      return await onFetchTradesData({
        // dateFrom: "2023-08-31T18:30:00.000Z",
        // dateTo: "2023-10-03T18:29:59.999Z",
        // tradeAddress: "esoM2PAAY2RzWcFnWUwXtSG8EWF2gEnxVvx6XAqMF2Agdn4as",
        dateFrom,
        dateTo,
        tradeAddress: selectedAccount.tradeAddress,
        tradeHistoryFetchToken,
        pageParam,
      });
    },
    getNextPageParam: (lastPage) => {
      // If the last page contains nextToken as null, don't fetch the next page
      if (!lastPage.nextToken) {
        return false;
      }
      return true;
    },
  });

  const onFetchTradesData = async ({
    dateFrom,
    dateTo,
    tradeAddress,
    tradeHistoryFetchToken,
    pageParam,
  }) => {
    if (tradeAddress) {
      const { trades, nextToken } = await fetchUserTrades(
        tradeAddress,
        dateFrom,
        dateTo,
        tradeHistoryFetchToken
      );
      setTradeHistoryFetchToken(nextToken);
      return { data: [...trades], pageParam, nextToken };
    }
    return { data: [], pageParam, nextToken: null };
  };

  const onUserTradeUpdate = useCallback(
    (payload: A.UserTradesUpdateEvent["payload"]) => {
      try {
        const trade = processTradeData(payload);
        setTradeHistoryList((prev) => [trade, ...prev]);
      } catch (error) {
        onHandleError(`User trades channel error: ${error?.message ?? error}`);
      }
    },
    [onHandleError]
  );

  useEffect(() => {
    if (mainAddress) {
      const subscription = eventHandler({
        cb: onUserTradeUpdate,
        name: mainAddress,
        eventType: "TradeFormat",
      });
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [mainAddress, onUserTradeUpdate]);

  useEffect(() => {
    setTradeHistoryList(data?.pages.flatMap((page) => page.data) ?? []);
  }, [data]);

  return (
    <Provider
      value={{
        success: isSuccess,
        data: tradeHistoryList,
        loading: isLoading,
        tradeHistoryNextToken: tradeHistoryFetchToken,
        onUserTradeUpdate,
        onFetchNextPage: fetchNextPage,
      }}
    >
      {children}
    </Provider>
  );
};
