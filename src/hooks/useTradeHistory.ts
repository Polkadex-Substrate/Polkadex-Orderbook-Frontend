import { useEffect, useMemo, useState } from "react";

import { useMarketsProvider } from "../providers/public/marketsProvider/useMarketsProvider";
import { useSessionProvider } from "../providers/user/sessionProvider/useSessionProvider";

import { Ifilters } from "@polkadex/orderbook-ui/organisms";
import { useProfile } from "@polkadex/orderbook/providers/user/profile";
import { useTrades } from "@polkadex/orderbook/providers/user/trades";

export function useTradeHistory(filters: Ifilters) {
  const profileState = useProfile();
  const { selectedAccount } = profileState;
  const tradesState = useTrades();
  const { onFetchTrades } = tradesState;

  const list = tradesState.data;
  const listSorted = useMemo(() => {
    return list.sort((a, b) => {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
  }, [list]);
  const fetching = tradesState.loading;
  const { currentMarket } = useMarketsProvider();
  const userLoggedIn = profileState.selectedAccount.tradeAddress !== "";
  const { dateFrom, dateTo } = useSessionProvider();

  const [updatedTradeList, setUpdatedTradeList] = useState(listSorted);

  useEffect(() => {
    if (userLoggedIn && currentMarket && tradesState.data.length === 0)
      onFetchTrades({
        dateFrom,
        dateTo,
        tradeAddress: selectedAccount.tradeAddress,
        tradeHistoryFetchToken: null,
      });
  }, [
    userLoggedIn,
    currentMarket,
    onFetchTrades,
    dateFrom,
    dateTo,
    selectedAccount.tradeAddress,
    tradesState.data,
  ]);

  useEffect(() => {
    if (filters?.onlyBuy && filters?.onlySell) {
      setUpdatedTradeList(list);
    } else if (filters?.onlyBuy) {
      setUpdatedTradeList(list.filter((data) => data.side?.toUpperCase() === "BID"));
    } else if (filters?.onlySell) {
      setUpdatedTradeList(list.filter((data) => data.side.toUpperCase() === "ASK"));
    } else if (filters?.hiddenPairs) {
      setUpdatedTradeList(
        list.filter((data) => {
          return data.side.toUpperCase() !== "ASK" && data.side.toUpperCase() !== "BID";
        })
      );
    } else {
      setUpdatedTradeList(list);
    }
  }, [filters, list]);

  return {
    trades: updatedTradeList,
    priceFixed: currentMarket?.quote_precision,
    amountFixed: currentMarket?.base_precision,
    userLoggedIn,
    isLoading: fetching,
    tradeHistoryNextToken: tradesState.tradeHistoryNextToken,
    onFetchTrades,
    error: tradesState.error,
  };
}
