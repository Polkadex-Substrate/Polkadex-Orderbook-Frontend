import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { assetsFetch } from "../modules/public/assets";

import { useReduxSelector } from "./useReduxSelector";

import {
  polkadotWalletFetch,
  extensionWalletFetch,
  rangerConnectFetch,
  selectRangerIsReady,
} from "@polkadex/orderbook-modules";

export const useAppDaemon = () => {
  const dispatch = useDispatch();
  const isApi = useReduxSelector(selectRangerIsReady);
  // basic initialization
  useEffect(() => {
    dispatch(rangerConnectFetch());
    dispatch(polkadotWalletFetch());
    dispatch(extensionWalletFetch());
  }, [dispatch]);

  // fetch assets
  useEffect(() => {
    if (isApi) dispatch(assetsFetch());
  }, [isApi, dispatch]);
};
