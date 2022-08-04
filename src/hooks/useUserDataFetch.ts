import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { selectAssetsFetchSuccess } from "../modules/public/assets";
import { balancesFetch } from "../modules/user/balances";
import { selectUserInfo } from "../modules/user/profile";
import { userSessionFetch } from "../modules/user/session";
import { userEventsFetch } from "../modules/user/userEventsListener";

import { useReduxSelector } from "./useReduxSelector";

export const useUserDataFetch = () => {
  const user = useReduxSelector(selectUserInfo);
  const dispatch = useDispatch();
  const isAsssetsFetched = useReduxSelector(selectAssetsFetchSuccess);
  // use user address here instead of hasUser as we need to refetch these on user change
  useEffect(() => {
    if (user.address) {
      dispatch(balancesFetch());
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (user.address) {
      dispatch(userSessionFetch());
      dispatch(userEventsFetch());
    }
  }, [dispatch, user]);
};
