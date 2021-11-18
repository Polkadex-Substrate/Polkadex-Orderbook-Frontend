import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  marketsFetch,
  selectShouldFetchMarkets,
  selectMarkets,
  setCurrentMarket,
} from "@polkadex/orderbook-modules";

import { useReduxSelector } from ".";

export const useMarketsFetch = (id: string) => {
  const dispatch = useDispatch();
  const shouldDispatch = useReduxSelector(selectShouldFetchMarkets);
  const markets = useReduxSelector(selectMarkets);
  const selectMarket = markets.find((item) => item.id === id);

  useEffect(() => {
    if (shouldDispatch) dispatch(marketsFetch());
    else if (!shouldDispatch && markets) dispatch(setCurrentMarket(selectMarket));
  }, [dispatch, shouldDispatch, markets, selectMarket]);
};
