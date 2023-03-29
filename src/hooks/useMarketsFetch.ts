// TODO: check marketsFetch repeated useEffect
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useReduxSelector } from ".";

import {
  marketsFetch,
  selectShouldFetchMarkets,
  selectMarkets,
  setCurrentMarket,
} from "@polkadex/orderbook-modules";

export const useMarketsFetch = (id: string) => {
  const dispatch = useDispatch();
  const shouldDispatch = useReduxSelector(selectShouldFetchMarkets);
  console.log(shouldDispatch, "should dispatch");

  const markets = useReduxSelector(selectMarkets);
  console.log(markets, " markets");

  const selectMarket = markets.find((item) => item.id === id);

  useEffect(() => {
    if (shouldDispatch) dispatch(marketsFetch());
    else if (!shouldDispatch && markets && selectMarket?.id)
      dispatch(setCurrentMarket(selectMarket));
  }, [dispatch, shouldDispatch, markets, selectMarket]);
};
