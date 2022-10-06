import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { selectAssetsFetchSuccess } from "../modules/public/assets";
import { balancesFetch } from "../modules/user/balances";
import { userSessionFetch } from "../modules/user/session";
import { userEventsFetch } from "../modules/user/userEventsListener";

import { useReduxSelector } from "./useReduxSelector";

import { selectUsingAccount } from "@polkadex/orderbook-modules";

export const useUserDataFetch = () => {
  const address = useReduxSelector(selectUsingAccount).mainAddress;
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
