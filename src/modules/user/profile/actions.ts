import { CommonError } from "../../types";

import {
  PROFILE_RESET_USER,
  PROFILE_USER_DATA,
  PROFILE_USER_ERROR,
  PROFILE_USER_FETCH,
  PROFILE_USER_CHANGE_INIT_BANNER,
} from "./constants";

export interface UserFetch {
  type: typeof PROFILE_USER_FETCH;
}
export interface UserChangeInitBanner {
  type: typeof PROFILE_USER_CHANGE_INIT_BANNER;
  payload: boolean;
}
export interface UserInfo {
  type: typeof PROFILE_USER_DATA;
  payload: {
    email: string;
    isConfirmed: boolean;
    isAuthenticated: boolean;
    userExists: boolean;
    session?: any;
    jwt?: string;
    shouldShowInitialBanner?: boolean;
  };
}

export interface UserError {
  type: typeof PROFILE_USER_ERROR;
  error: CommonError;
}

export interface UserReset {
  type: typeof PROFILE_RESET_USER;
}

export type ProfileAction =
  | UserFetch
  | UserInfo
  | UserError
  | UserReset
  | UserChangeInitBanner;

export const userFetch = (): UserFetch => ({
  type: PROFILE_USER_FETCH,
});

export const userChangeInitBanner = (payload = false): UserChangeInitBanner => ({
  type: PROFILE_USER_CHANGE_INIT_BANNER,
  payload,
});

export const userData = (payload: UserInfo["payload"]): UserInfo => ({
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
