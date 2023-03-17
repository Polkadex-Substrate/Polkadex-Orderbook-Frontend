import { useDispatch } from "react-redux";

import { useReduxSelector } from "./useReduxSelector";
import { useProfile } from "@polkadex/orderbook/providers/user/profile";
import { useAuth } from "@polkadex/orderbook/providers/user/auth";

import {
  logOutFetch,
} from "@polkadex/orderbook-modules";

export function useAccount() {
  const dispatch = useDispatch();
  const { email, userConfirmed } = useAuth();
  const {
    authInfo: { isAuthenticated: isSignedIn },
  } = useProfile();
  const isVerified = userConfirmed;

  return {
    userEmail: email,
    isSignedIn,
    isVerified,
    logout: () => dispatch(logOutFetch()),
  };
}
