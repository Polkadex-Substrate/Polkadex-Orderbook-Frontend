import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { assetsFetch, selectAssetsFetchSuccess } from "../modules/public/assets";

import {
  extensionWalletFetch,
  marketsFetch,
  rangerConnectFetch,
  selectIsUserSignedIn,
  tradeAccountsFetch,
  userAuthFetch,
} from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook/hooks/useReduxSelector";

export const useInit = () => {
  const dispatch = useDispatch();
  const isAssets = useReduxSelector(selectAssetsFetchSuccess);
  const isSignedIn = useReduxSelector(selectIsUserSignedIn);

  // basic initialization
  useEffect(() => {
    dispatch(rangerConnectFetch());
    dispatch(tradeAccountsFetch());
    dispatch(userAuthFetch());
    dispatch(extensionWalletFetch());
    dispatch(assetsFetch());
  }, [dispatch]);

  useEffect(() => {
    if (!isSignedIn) {
      dispatch(userAuthFetch());
    }
  }, [dispatch, isSignedIn]);

  useEffect(() => {
    if (isAssets) dispatch(marketsFetch());
  }, [isAssets, dispatch]);
};
