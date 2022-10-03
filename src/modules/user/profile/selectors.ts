import { RootState } from "../../";

export const selectUserIdentity = (state: RootState): string =>
  state.user.profile.authInfo.email;

export const selectShouldShowInitialBanner = (state: RootState): boolean =>
  state.user.profile.authInfo.shouldShowInitialBanner;

export const selectIsUserSignedIn = (state: RootState): boolean => {
  return state.user.profile.authInfo.isAuthenticated;
};
export const selectIsUserVerified = (state: RootState): boolean => {
  return state.user.profile.authInfo.isConfirmed;
};

export const selectUserAuthFetching = (state: RootState): boolean =>
  state.user.profile.isAuthFetching;

export const selectUserAuthFetchSuccess = (state: RootState): boolean | undefined =>
  state.user.profile.isAuthSuccess;
