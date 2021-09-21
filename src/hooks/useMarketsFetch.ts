import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { marketsFetch, selectShouldFetchMarkets } from "../modules/public/markets";

import { useReduxSelector } from ".";

export const useMarketsFetch = () => {
  const shouldDispatch = useReduxSelector(selectShouldFetchMarkets);
  const dispatch = useDispatch();

  useEffect(() => {
    if (shouldDispatch) dispatch(marketsFetch());
  }, [dispatch, shouldDispatch]);
};
