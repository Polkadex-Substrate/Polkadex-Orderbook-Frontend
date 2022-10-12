import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { assetsFetch, selectAssetsFetchSuccess } from "../modules/public/assets";

import {
  extensionWalletFetch,
  marketsFetch,
  rangerConnectFetch,
  tradeAccountsFetch,
  userAuthFetch,
} from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook/hooks/useReduxSelector";

export const useInit = () => {
  const dispatch = useDispatch();
  const isAssets = useReduxSelector(selectAssetsFetchSuccess);
  // basic initialization
  useEffect(() => {
    dispatch(rangerConnectFetch());
    dispatch(tradeAccountsFetch());
    dispatch(userAuthFetch());
    dispatch(extensionWalletFetch());
  }, [dispatch]);

  // fetch assets
  useEffect(() => {
    dispatch(assetsFetch());
  }, []);

  useEffect(() => {
    if (isAssets) dispatch(marketsFetch());
  }, [isAssets]);
};
