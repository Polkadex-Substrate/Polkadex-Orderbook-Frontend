import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { selectAssetsFetchSuccess } from "../modules/public/assets";
import { userSessionFetch } from "../modules/user/session";
import { userEventsFetch } from "../modules/user/userEventsListener";

import { useReduxSelector } from "./useReduxSelector";

import { useProfile } from "@polkadex/orderbook/providers/user/profile";
import { useBalancesProvider } from "../providers/user/balancesProvider/useBalancesProvider";

export const useUserDataFetch = () => {
  const profileState = useProfile();
  const address = profileState.selectedAccount.mainAddress;
  const dispatch = useDispatch();
  const isAssetsFetched = useReduxSelector(selectAssetsFetchSuccess);
  const { dispatchBalancesFetch } = useBalancesProvider();
  // use user address here instead of hasUser as we need to refetch these on user change
  useEffect(() => {
    if (address) {
      dispatchBalancesFetch();
    }
  }, [isAssetsFetched, address, dispatch]);
  useEffect(() => {
    if (address) {
      dispatch(userSessionFetch());
      dispatch(userEventsFetch());
    }
  }, [dispatch, address]);
};
