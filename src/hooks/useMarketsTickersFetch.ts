import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useReduxSelector } from ".";

import {
  marketsTickersChannelFetch,
  marketsTickersFetch,
  selectShouldFetchMarketsTickers,
} from "@polkadex/orderbook-modules";

export const useMarketsTickersFetch = () => {
  const shouldDispatch = useReduxSelector(selectShouldFetchMarketsTickers);
  const dispatch = useDispatch();

  useEffect(() => {
    if (shouldDispatch) {
      dispatch(marketsTickersFetch());
      dispatch(marketsTickersChannelFetch());
    }
  }, [dispatch, shouldDispatch]);
};
