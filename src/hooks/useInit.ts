import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { assetsFetch, selectAssetsFetchSuccess } from "../modules/public/assets";

import {
  extensionWalletFetch,
  marketsFetch,
  rangerConnectFetch,
  selectShouldRangerConnect,
} from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook/hooks/useReduxSelector";
import { useTradeWallet } from "../providers/user/tradeWallet";

export const useInit = () => {
  const dispatch = useDispatch();
  const isAssets = useReduxSelector(selectAssetsFetchSuccess);
  const shouldRangerConnect = useReduxSelector(selectShouldRangerConnect);
  const { onLoadTradeAccounts } = useTradeWallet();

  // basic initialization
  useEffect(() => {
    if (shouldRangerConnect) dispatch(rangerConnectFetch());
    onLoadTradeAccounts();
    dispatch(extensionWalletFetch());
    dispatch(assetsFetch());
  }, [dispatch, shouldRangerConnect]);

  useEffect(() => {
    if (isAssets) dispatch(marketsFetch());
  }, [isAssets, dispatch]);
};
