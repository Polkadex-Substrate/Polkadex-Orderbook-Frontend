import { CommonError } from "../../types";

import {
  PROFILE_RESET_USER,
  PROFILE_USER_DATA,
  PROFILE_USER_ERROR,
  PROFILE_USER_FETCH,
  PROFILE_USER_CHANGE_INIT_BANNER,
  PROFILE_USER_AUTH_FETCH,
  PROFILE_USER_AUTH_DATA,
  PROFILE_USER_AUTH_ERROR,
  PROFILE_USER_SELECT_ACCOUNT_FETCH,
  PROFILE_USER_SELECT_ACCOUNT_DATA,
  PROFILE_USER_ACCOUNT_PUSH,
  PROFILE_USER_MAIN_ACCOUNT_PUSH,
} from "./constants";

export interface UserChangeInitBanner {
  type: typeof PROFILE_USER_CHANGE_INIT_BANNER;
  payload: boolean;
}
export interface AuthInfo {
  email: string;
  isConfirmed: boolean;
  isAuthenticated: boolean;
  userExists: boolean;
  session?: any;
  jwt?: string;
  shouldShowInitialBanner?: boolean;
}
export interface UserAccount {
  mainAddress: string; // the main address linked to the trade address
  tradeAddress: string;
}
export interface UserFetch {
  type: typeof PROFILE_USER_FETCH;
  payload: {
    email;
  };
}

export interface UserData {
  type: typeof PROFILE_USER_DATA;
  payload: {
    mainAccounts: string[];
    userAccounts: UserAccount[];
  };
}
export interface UserError {
  type: typeof PROFILE_USER_ERROR;
  error: CommonError;
}

export interface UserReset {
  type: typeof PROFILE_RESET_USER;
}

export interface UserAuthFetch {
  type: typeof PROFILE_USER_AUTH_FETCH;
}

export interface UserAuthData {
  type: typeof PROFILE_USER_AUTH_DATA;
  payload: AuthInfo;
}

export interface UserAuthError {
  type: typeof PROFILE_USER_AUTH_ERROR;
  error: CommonError;
}
export interface UserAccountSelectFetch {
  type: typeof PROFILE_USER_SELECT_ACCOUNT_FETCH;
  payload: { tradeAddress: string };
}

export interface UserAccountSelectData {
  type: typeof PROFILE_USER_SELECT_ACCOUNT_DATA;
  payload: UserAccount;
}

export interface UserProfileAccountPush {
  type: typeof PROFILE_USER_ACCOUNT_PUSH;
  payload: UserAccount;
}
export interface UserProfileMainAccountPush {
  type: typeof PROFILE_USER_MAIN_ACCOUNT_PUSH;
  payload: string;
}

export type ProfileAction =
  | UserFetch
  | UserData
  | UserError
  | UserReset
  | UserChangeInitBanner
  | UserAuthFetch
  | UserAuthData
  | UserAuthError
  | UserAccountSelectFetch
  | UserAccountSelectData
  | UserProfileAccountPush
  | UserProfileMainAccountPush;

export const userFetch = (payload: UserFetch["payload"]): UserFetch => ({
  type: PROFILE_USER_FETCH,
  payload,
});

export const userChangeInitBanner = (payload = false): UserChangeInitBanner => ({
  type: PROFILE_USER_CHANGE_INIT_BANNER,
  payload,
});

export const userData = (payload: UserData["payload"]): UserData => ({
  type: PROFILE_USER_DATA,
  payload,
});

export const userError = (error: CommonError): UserError => ({
  type: PROFILE_USER_ERROR,
  error,
});

export const userReset = (): UserReset => ({
  type: PROFILE_RESET_USER,
});

export const userAuthFetch = (): UserAuthFetch => ({
  type: PROFILE_USER_AUTH_FETCH,
});

export const userAuthData = (payload: UserAuthData["payload"]): UserAuthData => ({
  type: PROFILE_USER_AUTH_DATA,
  payload,
});

export const userAuthError = (error: CommonError): UserAuthError => ({
  type: PROFILE_USER_AUTH_ERROR,
  error,
});

export const userAccountSelectFetch = (
  payload: UserAccountSelectFetch["payload"]
): UserAccountSelectFetch => ({
  type: PROFILE_USER_SELECT_ACCOUNT_FETCH,
  payload,
});

export const userAccountSelectData = (
  payload: UserAccountSelectData["payload"]
): UserAccountSelectData => ({
  type: PROFILE_USER_SELECT_ACCOUNT_DATA,
  payload,
});

export const userProfileAccountPush = (payload: UserProfileAccountPush["payload"]) => ({
  type: PROFILE_USER_ACCOUNT_PUSH,
  payload,
});

export const userProfileMainAccountPush = (
  payload: UserProfileMainAccountPush["payload"]
) => ({
  type: PROFILE_USER_MAIN_ACCOUNT_PUSH,
  payload,
});
