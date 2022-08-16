import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { assetsFetch } from "../modules/public/assets";

import { useReduxSelector } from "./useReduxSelector";

import {
  extensionWalletFetch,
  rangerConnectFetch,
  selectRangerIsReady,
  tradeAccountsFetch,
  userFetch,
} from "@polkadex/orderbook-modules";

export const useInit = () => {
  const dispatch = useDispatch();
  const isApi = useReduxSelector(selectRangerIsReady);
  // basic initialization
  useEffect(() => {
    dispatch(rangerConnectFetch());
    dispatch(tradeAccountsFetch());
    dispatch(userFetch());
    dispatch(extensionWalletFetch());
  }, [dispatch]);

  // fetch assets
  useEffect(() => {
    if (isApi) dispatch(assetsFetch());
  }, [isApi, dispatch]);
};
