import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { userSessionFetch } from "../modules/user/session";
import { userEventsFetch } from "../modules/user/userEventsListener";

import { useProfile } from "@polkadex/orderbook/providers/user/profile";

export const useUserDataFetch = () => {
  const profileState = useProfile();
  const address = profileState.selectedAccount.mainAddress;
  const dispatch = useDispatch();
  // use user address here instead of hasUser as we need to refetch these on user change
  useEffect(() => {
    if (address) {
      dispatch(userSessionFetch());
      dispatch(userEventsFetch());
    }
  }, [dispatch, address]);
};
