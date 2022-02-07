import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useReduxSelector } from ".";

import {
  marketsFetch,
  selectShouldFetchMarkets,
  selectMarkets,
  setCurrentMarket,
  selectUserInfo,
} from "@polkadex/orderbook-modules";

export const useMarketsFetch = (id: string) => {
  const dispatch = useDispatch();
  const shouldDispatch = useReduxSelector(selectShouldFetchMarkets);
  const markets = useReduxSelector(selectMarkets);
  const selectMarket = markets.find((item) => item.id === id);
  const user = useReduxSelector(selectUserInfo);

  useEffect(() => {
    if (shouldDispatch) dispatch(marketsFetch());
    else if (!shouldDispatch && markets) dispatch(setCurrentMarket(selectMarket));
  }, [dispatch, shouldDispatch, markets, selectMarket]);

  useEffect(() => {
    dispatch(marketsFetch());
  }, [dispatch, user]);
};
