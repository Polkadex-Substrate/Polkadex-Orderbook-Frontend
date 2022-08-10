import { RootState } from "../../";

import { ProxyAccount } from "./types";

import { UserSkeleton } from ".";

export const selectUserLoggedIn = (state: RootState): boolean => {
  return state.user.profile.userData.user.address !== "";
};
export const selectHasUser = (state: RootState): boolean =>
  !!state.user.profile.userData.user?.address?.length;

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
