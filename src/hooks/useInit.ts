import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { assetsFetch, selectAssetsFetchSuccess } from "../modules/public/assets";

import {
  extensionWalletFetch,
  marketsFetch,
  tradeAccountsFetch,
} from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook/hooks/useReduxSelector";
import { useNativeApi } from "@polkadex/orderbook/providers/public/nativeApi";

export const useInit = () => {
  const dispatch = useDispatch();
  const { onConnectNativeApi, timestamp, connecting } = useNativeApi();
  const isAssets = useReduxSelector(selectAssetsFetchSuccess);
  const shouldRangerConnect = !timestamp && !connecting;

  // basic initialization
  useEffect(() => {
    if (shouldRangerConnect) onConnectNativeApi();
    dispatch(tradeAccountsFetch());
    dispatch(extensionWalletFetch());
    dispatch(assetsFetch());
  }, [dispatch, shouldRangerConnect]);

  useEffect(() => {
    if (isAssets) dispatch(marketsFetch());
  }, [isAssets, dispatch]);
};
