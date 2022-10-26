import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";

import {
  selectCurrentMarket,
  selectUserTrades,
  userTradesFetch,
  selectTradesLoading,
  selectUserSession,
  selectHasSelectedAccount,
} from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { Ifilters } from "@polkadex/orderbook-ui/organisms";

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
  const userLoggedIn = useReduxSelector(selectHasSelectedAccount);
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
    priceFixed: currentMarket?.quote_precision,
    amountFixed: currentMarket?.base_precision,
    userLoggedIn,
    isLoading: fetching,
  };
}
