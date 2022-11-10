import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { selectAssetsFetchSuccess } from "../modules/public/assets";
import { balancesFetch } from "../modules/user/balances";
import { userSessionFetch } from "../modules/user/session";
import { userEventsFetch } from "../modules/user/userEventsListener";

import { useReduxSelector } from "./useReduxSelector";

import { selectRangerIsReady, selectUsingAccount } from "@polkadex/orderbook-modules";

export const useUserDataFetch = () => {
  const address = useReduxSelector(selectUsingAccount).mainAddress;
  const dispatch = useDispatch();
  const isAssetsFetched = useReduxSelector(selectAssetsFetchSuccess);
  const isRangerConnected = useReduxSelector(selectRangerIsReady);

  // use user address here instead of hasUser as we need to refetch these on user change
  useEffect(() => {
    if (address && isRangerConnected) {
      dispatch(balancesFetch());
    }
  }, [isAssetsFetched, address, dispatch, isRangerConnected]);

  useEffect(() => {
    if (address) {
      dispatch(userSessionFetch());
    } else if (!!address && isRangerConnected) dispatch(userEventsFetch());
  }, [dispatch, address, isRangerConnected]);
};
