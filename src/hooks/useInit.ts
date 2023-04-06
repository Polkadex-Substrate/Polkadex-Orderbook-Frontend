import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { assetsFetch, selectAssetsFetchSuccess } from "../modules/public/assets";

import { marketsFetch } from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook/hooks/useReduxSelector";
import { useTradeWallet } from "../providers/user/tradeWallet";
import { useNativeApi } from "@polkadex/orderbook/providers/public/nativeApi";
import { useExtensionWallet } from "@polkadex/orderbook/providers/user/extensionWallet";

export const useInit = () => {
  const dispatch = useDispatch();
  const { onConnectNativeApi, timestamp, connecting } = useNativeApi();
  const { onLoadTradeAccounts } = useTradeWallet();
  const { onPolkadotExtensionWallet } = useExtensionWallet();
  const isAssets = useReduxSelector(selectAssetsFetchSuccess);
  const shouldRangerConnect = !timestamp && !connecting;

  // basic initialization
  useEffect(() => {
    if (shouldRangerConnect) onConnectNativeApi();
    onLoadTradeAccounts();
    onPolkadotExtensionWallet();
    dispatch(assetsFetch());
  }, [dispatch, shouldRangerConnect]);

  useEffect(() => {
    if (isAssets) dispatch(marketsFetch());
  }, [isAssets, dispatch]);
};
