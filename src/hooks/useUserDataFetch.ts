import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { selectAssetsFetchSuccess } from "../modules/public/assets";
import { balancesFetch } from "../modules/user/balances";
import { userSessionFetch } from "../modules/user/session";
import { userEventsFetch } from "../modules/user/userEventsListener";

import { useReduxSelector } from "./useReduxSelector";

import { useProfile } from "@polkadex/orderbook/providers/user/profile";

export const useUserDataFetch = () => {
  const profileState = useProfile();
  const address = profileState.selectedAccount.mainAddress;
  const dispatch = useDispatch();
  const isAssetsFetched = useReduxSelector(selectAssetsFetchSuccess);
  // use user address here instead of hasUser as we need to refetch these on user change
  useEffect(() => {
    if (address) {
      dispatch(balancesFetch());
    }
  }, [isAssetsFetched, address, dispatch]);
  useEffect(() => {
    if (address) {
      dispatch(userSessionFetch());
      dispatch(userEventsFetch());
    }
  }, [dispatch, address]);
};
