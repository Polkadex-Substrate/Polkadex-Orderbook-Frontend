import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  marketsTickersFetch,
  selectShouldFetchMarketsTickers,
} from "@polkadex/orderbook-modules";

import { useReduxSelector } from ".";

export const useMarketsTickersFetch = () => {
  const shouldDispatch = useReduxSelector(selectShouldFetchMarketsTickers);
  const dispatch = useDispatch();

  useEffect(() => {
    if (shouldDispatch) dispatch(marketsTickersFetch());
  }, [dispatch, shouldDispatch]);
};
