import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";

import {
  selectCurrentMarket,
  selectUserLoggedIn,
  selectUserTrades,
  userTradesFetch,
  selectTradesLoading,
  selectUserSession,
  selectHasUser,
} from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { Ifilters } from "@polkadex/orderbook/v3/ui/organisms/Transactions";

export function useTradeHistory(filters: Ifilters) {
  const dispatch = useDispatch();

  const list = useReduxSelector(selectUserTrades);
  const listSorted = useMemo(() => {
    return list.sort((a, b) => {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
  }, [list]);
  const fetching = useReduxSelector(selectTradesLoading);
  const currentMarket = useReduxSelector(selectCurrentMarket);
  const userLoggedIn = useReduxSelector(selectHasUser);
  const userSession = useReduxSelector(selectUserSession);

  const [updatedTradeList, setUpdatedTradeList] = useState(listSorted);

  useEffect(() => {
    if (userLoggedIn && currentMarket) dispatch(userTradesFetch());
  }, [userLoggedIn, currentMarket, dispatch, userSession]);

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
    priceFixed: currentMarket?.price_precision,
    amountFixed: currentMarket?.amount_precision,
    userLoggedIn,
    isLoading: fetching,
  };
}
