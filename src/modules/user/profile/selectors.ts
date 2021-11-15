import { RootState } from "../..";

import { ProxyAccount, UserSkeleton } from "./types";

export const selectUserLoggedIn = (state: RootState): boolean => {
  const {
    user: { profile },
  } = state;

  return !profile.userData.isFetching && profile.userData.user.state === "active";
};

export const selectUserInfo = (state: RootState): ProxyAccount =>
  state.user.profile.userData.user;

export const selectUserFetching = (state: RootState): boolean =>
  state.user.profile.userData.isFetching;

export const selectUserDataChange = (state: RootState): boolean | undefined =>
  state.user.profile.userData.success;

export const selectAllProxyAccounts = (state: RootState): UserSkeleton[] =>
  state.user.profile.allUsers;

export const selectProxyAddress = (state: RootState): string =>
  state.user.profile.userData.user.address;
