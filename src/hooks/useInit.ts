import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { assetsFetch, selectAssetsFetchSuccess } from "../modules/public/assets";

import {
  extensionWalletFetch,
  marketsFetch,
  rangerConnectFetch,
  selectIsUserSignedIn,
  selectRangerIsReady,
  selectShouldRangerConnect,
  tradeAccountsFetch,
  userAuthFetch,
} from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook/hooks/useReduxSelector";

export const useInit = () => {
  const dispatch = useDispatch();
  const isAssets = useReduxSelector(selectAssetsFetchSuccess);
  const isSignedIn = useReduxSelector(selectIsUserSignedIn);
  const shouldRangerConnect = useReduxSelector(selectShouldRangerConnect);
  const isRangerConnected = useReduxSelector(selectRangerIsReady);

  // basic initialization
  useEffect(() => {
    if (shouldRangerConnect) dispatch(rangerConnectFetch());
    else if (isRangerConnected) {
      dispatch(tradeAccountsFetch());
      dispatch(extensionWalletFetch());
      dispatch(assetsFetch());
    }
  }, [dispatch, shouldRangerConnect, isRangerConnected]);

  useEffect(() => {
    if (isSignedIn) dispatch(userAuthFetch());
  }, [dispatch, isSignedIn]);

  useEffect(() => {
    if (isAssets) dispatch(marketsFetch());
  }, [isAssets, dispatch]);
};
