import { CommonError } from "../../types";

import {
  AUTH_CONNECT_PHONE_DATA,
  AUTH_CONNECT_PHONE_ERROR,
  AUTH_CONNECT_PHONE_FETCH,
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

export interface ConnectPhoneFetch {
  type: typeof AUTH_CONNECT_PHONE_FETCH;
  payload: {
    mnemonic: string;
  };
}
export interface ConnectPhoneData {
  type: typeof AUTH_CONNECT_PHONE_DATA;
}

export interface ConnectPhoneError {
  type: typeof AUTH_CONNECT_PHONE_ERROR;
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
  | LogoutFetch
  | ConnectPhoneFetch
  | ConnectPhoneData
  | ConnectPhoneError;

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

export const signUp = (payload: SignUpFetch["payload"]): SignUpFetch => ({
  type: AUTH_SIGN_UP_FETCH,
  payload,
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

export const connectPhoneFetch = (
  payload: ConnectPhoneFetch["payload"]
): ConnectPhoneFetch => ({
  type: AUTH_CONNECT_PHONE_FETCH,
  payload,
});

export const connectPhoneData = (): ConnectPhoneData => ({
  type: AUTH_CONNECT_PHONE_DATA,
});

export const connectPhoneError = (error: CommonError): ConnectPhoneError => ({
  type: AUTH_CONNECT_PHONE_ERROR,
  error,
});
