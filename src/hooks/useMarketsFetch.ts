// TODO: check marketsFetch repeated useEffect
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useReduxSelector } from ".";

import {
  marketsFetch,
  selectShouldFetchMarkets,
  selectMarkets,
  setCurrentMarket,
  selectUserInfo,
  selectRangerApi,
  selectRangerIsConnected,
} from "@polkadex/orderbook-modules";

export const useMarketsFetch = (id: string) => {
  const dispatch = useDispatch();
  const shouldDispatch = useReduxSelector(selectShouldFetchMarkets);
  const markets = useReduxSelector(selectMarkets);
  const selectMarket = markets.find((item) => item.id === id);
  debugger;
  const user = useReduxSelector(selectUserInfo);
  const api = useReduxSelector(selectRangerApi);
  const isApiConnectd = useReduxSelector(selectRangerIsConnected);

  useEffect(() => {
    if (shouldDispatch) dispatch(marketsFetch());
    else if (!shouldDispatch && markets) dispatch(setCurrentMarket(selectMarket));
  }, [dispatch, shouldDispatch, markets, selectMarket]);

  useEffect(() => {
    if (isApiConnectd) dispatch(marketsFetch());
  }, [dispatch, user, api, isApiConnectd]);
};
