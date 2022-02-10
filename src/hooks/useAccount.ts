import { useDispatch } from "react-redux";

import { selectUserInfo } from "../modules/user/profile";

import { useReduxSelector } from ".";

import { logoutFetch } from "@polkadex/orderbook-modules";

export function useAccount() {
  const dispatch = useDispatch();

  const user = useReduxSelector(selectUserInfo);

  return {
    userAddress: user?.address || "0x000000000",
    userName: user?.accountName || "Account",
    logout: () => dispatch(logoutFetch()),
  };
}
