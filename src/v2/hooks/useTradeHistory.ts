import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";

import {
  selectCurrentMarket,
  selectUserLoggedIn,
  selectUserTrades,
  userTradesFetch,
  selectTradesLoading,
  selectUserSession,
} from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";

export function useTradeHistory() {
  const dispatch = useDispatch();

  const list = useReduxSelector(selectUserTrades);
  const listSorted = useMemo(() => {
    return list.sort((a, b) => {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
  }, [list]);
  const fetching = useReduxSelector(selectTradesLoading);
  const currentMarket = useReduxSelector(selectCurrentMarket);
  const userLoggedIn = useReduxSelector(selectUserLoggedIn);
  const userSession = useReduxSelector(selectUserSession);

  useEffect(() => {
    if (userLoggedIn && currentMarket) dispatch(userTradesFetch());
  }, [userLoggedIn, currentMarket, dispatch, userSession]);

  return {
    trades: listSorted,
    priceFixed: currentMarket?.price_precision,
    amountFixed: currentMarket?.amount_precision,
    userLoggedIn,
    isLoading: fetching,
  };
}
