import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { useReduxSelector } from "./useReduxSelector";

import {
  logOutFetch,
  selectDefaultTradeAccount,
  selectIsUserSignedIn,
  selectIsUserVerified,
  selectUserAccounts,
  selectUserEmail,
  userAccountSelectFetch,
  userAuthFetch,
} from "@polkadex/orderbook-modules";

export function useAccount() {
  const dispatch = useDispatch();
  const email = useReduxSelector(selectUserEmail);
  const isSignedIn = useReduxSelector(selectIsUserSignedIn);
  const isVerified = useReduxSelector(selectIsUserVerified);
  const accounts = useReduxSelector(selectUserAccounts);
  const defaultTradeAddress = useReduxSelector(selectDefaultTradeAccount);

  useEffect(() => {
    if (!isSignedIn) {
      dispatch(userAuthFetch());
    }
  }, [dispatch, isSignedIn]);

  useEffect(() => {
    if (accounts?.length > 0)
      dispatch(userAccountSelectFetch({ tradeAddress: defaultTradeAddress }));
  }, [accounts]);

  return {
    userEmail: email,
    isSignedIn,
    isVerified,
    logout: () => dispatch(logOutFetch()),
  };
}
