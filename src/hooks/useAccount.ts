import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { useReduxSelector } from "./useReduxSelector";

import {
  logOutFetch,
  selectIsUserSignedIn,
  selectIsUserVerified,
  selectUserIdentity,
  userAuthFetch,
} from "@polkadex/orderbook-modules";

export function useAccount() {
  const dispatch = useDispatch();
  const email = useReduxSelector(selectUserIdentity);
  const isSignedIn = useReduxSelector(selectIsUserSignedIn);
  const isVerified = useReduxSelector(selectIsUserVerified);

  useEffect(() => {
    if (!isSignedIn) dispatch(userAuthFetch());
  }, [dispatch, isSignedIn]);

  return {
    userEmail: email,
    isSignedIn,
    isVerified,
    logout: () => dispatch(logOutFetch()),
  };
}
