import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { assetsFetch, selectAssetsFetchSuccess } from "../modules/public/assets";

import {
  extensionWalletFetch,
  marketsFetch,
  selectShouldRangerConnect,
  tradeAccountsFetch,
} from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook/hooks/useReduxSelector";
import { useRanger } from "@polkadex/orderbook/providers/public/ranger";

export const useInit = () => {
  const dispatch = useDispatch();
  const { onConnectRanger } = useRanger();
  const isAssets = useReduxSelector(selectAssetsFetchSuccess);
  const shouldRangerConnect = useReduxSelector(selectShouldRangerConnect);

  // basic initialization
  useEffect(() => {
    if (shouldRangerConnect) onConnectRanger();
    dispatch(tradeAccountsFetch());
    dispatch(extensionWalletFetch());
    dispatch(assetsFetch());
  }, [dispatch, shouldRangerConnect]);

  useEffect(() => {
    if (isAssets) dispatch(marketsFetch());
  }, [isAssets, dispatch]);
};
