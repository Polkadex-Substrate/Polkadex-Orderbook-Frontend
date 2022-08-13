import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { selectAssetsFetchSuccess } from "../modules/public/assets";
import { balancesFetch } from "../modules/user/balances";
import { selectCurrentMainAccount } from "../modules/user/mainAccount";
import { userSessionFetch } from "../modules/user/session";
import { userEventsFetch } from "../modules/user/userEventsListener";

import { useReduxSelector } from "./useReduxSelector";

export const useUserDataFetch = () => {
  const address = useReduxSelector(selectCurrentMainAccount);
  const dispatch = useDispatch();
  const isAsssetsFetched = useReduxSelector(selectAssetsFetchSuccess);
  // use user address here instead of hasUser as we need to refetch these on user change
  useEffect(() => {
    if (address) {
      dispatch(balancesFetch());
    }
  }, [isAsssetsFetched, address, dispatch]);

  useEffect(() => {
    if (address) {
      dispatch(userSessionFetch());
      dispatch(userEventsFetch());
    }
  }, [dispatch, address]);
};
