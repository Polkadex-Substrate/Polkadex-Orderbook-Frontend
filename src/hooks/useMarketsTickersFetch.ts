import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useReduxSelector } from ".";

import {
  marketsTickersChannelFetch,
  marketsTickersFetch,
  selectCurrentMarket,
  selectShouldFetchMarketsTickers,
} from "@polkadex/orderbook-modules";

export const useMarketsTickersFetch = () => {
  const shouldDispatch = useReduxSelector(selectShouldFetchMarketsTickers);
  const currentMarket = useReduxSelector(selectCurrentMarket);
  const dispatch = useDispatch();

  useEffect(() => {
    if (shouldDispatch) {
      dispatch(marketsTickersFetch());
    }
  }, [dispatch, shouldDispatch]);

  useEffect(() => {
    if (currentMarket?.id) dispatch(marketsTickersChannelFetch());
  }, [dispatch, currentMarket]);
};
