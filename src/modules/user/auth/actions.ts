import { CommonError } from "../../types";

import {
  AUTH_KEYRING_SIGN_IN_DATA,
  AUTH_LOGOUT_FAILURE,
  AUTH_LOGOUT_FETCH,
  AUTH_SIGN_IN_DATA,
  AUTH_SIGN_IN_ERROR,
  AUTH_SIGN_IN_FETCH,
  AUTH_SIGN_UP_DATA,
  AUTH_SIGN_UP_ERROR,
  AUTH_SIGN_UP_FETCH,
} from "./constants";

import { InjectedAccount } from "@polkadex/orderbook-modules";

export interface SignUpKeyRingData {
  type: string;
  payload: {
    mnemonic: string;
    name: string;
    password: string;
  };
}
export interface SignInKeyRingData {
  payload: {
    name: string;
    password: string;
  };
}
export interface GeetestCaptchaResponse {
  geetest_challenge: string;
  geetest_validate: string;
  geetest_seccode: string;
}

export interface SignInFetch {
  type: typeof AUTH_SIGN_IN_FETCH;
  payload: {
    address: string;
    password: string;
  };
}

export interface SignInError {
  type: typeof AUTH_SIGN_IN_ERROR;
  error: CommonError;
}

export interface SignInData {
  type: typeof AUTH_SIGN_IN_DATA;
}

export interface SignUpFetch {
  type: typeof AUTH_SIGN_UP_FETCH;
  payload: {
    accountName: string;
    mnemonic: string;
    password: string;
  };
  callbackAction?: {
    scope: string;
    component: string;
    key: string;
    value: any;
  };
}

export interface SignUpData {
  type: typeof AUTH_SIGN_UP_DATA;
}

export interface SignUpError {
  type: typeof AUTH_SIGN_UP_ERROR;
  error: CommonError;
}

export interface LogoutFetch {
  type: typeof AUTH_LOGOUT_FETCH;
}

export interface LogoutFailed {
  type: typeof AUTH_LOGOUT_FAILURE;
  error: CommonError;
}

export type AuthAction =
  | SignInFetch
  | SignInData
  | SignInError
  | SignUpData
  | SignUpFetch
  | SignUpError
  | LogoutFailed
  | LogoutFetch;

export const signInKeyRingData = (payload: SignInKeyRingData["payload"]) => ({
  type: AUTH_KEYRING_SIGN_IN_DATA,
  payload,
});
export const signIn = (address: string, password: string): SignInFetch => ({
  type: AUTH_SIGN_IN_FETCH,
  payload: {
    address,
    password,
  },
});

export const signInData = (): SignInData => ({
  type: AUTH_SIGN_IN_DATA,
});

export const signInError = (error: CommonError): SignInError => ({
  type: AUTH_SIGN_IN_ERROR,
  error,
});

export const signUp = (
  payload: SignUpFetch["payload"],
  callbackAction?: SignUpFetch["callbackAction"]
): SignUpFetch => ({
  type: AUTH_SIGN_UP_FETCH,
  payload,
  callbackAction,
});

export const signUpData = (): SignUpData => ({
  type: AUTH_SIGN_UP_DATA,
});

export const signUpError = (error: CommonError): SignUpError => ({
  type: AUTH_SIGN_UP_ERROR,
  error,
});

export const logoutFetch = (): LogoutFetch => ({
  type: AUTH_LOGOUT_FETCH,
});

export const logoutError = (error: CommonError): LogoutFailed => ({
  type: AUTH_LOGOUT_FAILURE,
  error,
});
