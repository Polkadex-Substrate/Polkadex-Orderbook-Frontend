import { ProfileState, RootState } from "../../";

export const selectUserSignedIn = (state: RootState): boolean => {
  return state.user.polkadotWallet.selectedAccount?.address !== "";
};
export const selectUserIdentity = (state: RootState): string =>
  state.user.profile.userData.email;

export const selectSignedInUserInfo = (state: RootState): ProfileState["userData"] =>
  state.user.profile.userData;

export const selectShouldShowInitialBanner = (state: RootState): boolean =>
  state.user.profile.userData.shouldShowInitialBanner;

export const selectIsUserSignedIn = (state: RootState): boolean => {
  return state.user.profile.userData.isAuthenticated;
};

export const selectIsUserVerified = (state: RootState): boolean => {
  return state.user.profile.userData.isConfirmed;
};

export const selectUserFetching = (state: RootState): boolean => state.user.profile.isFetching;

export const selectUserFetchSuccess = (state: RootState): boolean | undefined =>
  state.user.profile.isSuccess;
