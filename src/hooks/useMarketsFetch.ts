// TODO: check marketsFetch repeated useEffect
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useReduxSelector } from ".";

import {
  marketsFetch,
  selectShouldFetchMarkets,
  selectMarkets,
  setCurrentMarket,
  selectRangerIsReady,
} from "@polkadex/orderbook-modules";

export const useMarketsFetch = (id: string) => {
  const dispatch = useDispatch();
  const shouldDispatch = useReduxSelector(selectShouldFetchMarkets);
  const markets = useReduxSelector(selectMarkets);
  const selectMarket = markets.find((item) => item.id === id);
  const isApiConnectd = useReduxSelector(selectRangerIsReady);

  useEffect(() => {
    if (shouldDispatch) dispatch(marketsFetch());
    else if (!shouldDispatch && markets && selectMarket?.id)
      dispatch(setCurrentMarket(selectMarket));
  }, [dispatch, shouldDispatch, markets, selectMarket]);

  useEffect(() => {
    if (isApiConnectd) dispatch(marketsFetch());
  }, [dispatch, isApiConnectd]);
};
