import { useDispatch } from "react-redux";

import { useReduxSelector } from "./useReduxSelector";

import {
  logOutFetch,
  selectIsUserSignedIn,
  selectIsUserVerified,
  selectUserEmail,
} from "@polkadex/orderbook-modules";

export function useAccount() {
  const dispatch = useDispatch();
  const email = useReduxSelector(selectUserEmail);
  const isSignedIn = useReduxSelector(selectIsUserSignedIn);
  const isVerified = useReduxSelector(selectIsUserVerified);

  return {
    userEmail: email,
    isSignedIn,
    isVerified,
    logout: () => dispatch(logOutFetch()),
  };
}
