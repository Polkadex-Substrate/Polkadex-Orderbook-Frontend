import { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  selectCurrentMarket,
  selectUserLoggedIn,
  selectTradesData,
  tradesFetch,
  selectTradesLoading,
} from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";

export function useTradeHistory() {
  const dispatch = useDispatch();

  const list = useReduxSelector(selectTradesData);

  const fetching = useReduxSelector(selectTradesLoading);
  const currentMarket = useReduxSelector(selectCurrentMarket);
  const userLoggedIn = useReduxSelector(selectUserLoggedIn);

  useEffect(() => {
    if (userLoggedIn && currentMarket) dispatch(tradesFetch());
  }, [userLoggedIn, currentMarket, dispatch]);

  return {
    orders: list,
    priceFixed: currentMarket?.price_precision,
    amountFixed: currentMarket?.amount_precision,
    userLoggedIn,
    isLoading: fetching,
  };
}
