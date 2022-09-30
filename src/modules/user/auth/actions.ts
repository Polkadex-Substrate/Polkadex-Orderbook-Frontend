import { CommonError } from "../../types";

import {
  AUTH_CHANGE_PASSWORD_DATA,
  AUTH_CHANGE_PASSWORD_ERROR,
  AUTH_CHANGE_PASSWORD_FETCH,
  AUTH_CODE_VERIFY_DATA,
  AUTH_CODE_VERIFY_ERROR,
  AUTH_CODE_VERIFY_FETCH,
  AUTH_FORGOT_PASSWORD_DATA,
  AUTH_FORGOT_PASSWORD_ERROR,
  AUTH_FORGOT_PASSWORD_FETCH,
  AUTH_LOGOUT_DATA,
  AUTH_LOGOUT_FAILURE,
  AUTH_LOGOUT_FETCH,
  AUTH_RESEND_CODE_DATA,
  AUTH_RESEND_CODE_ERROR,
  AUTH_RESEND_CODE_FETCH,
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
    email: string;
    password: string;
  };
}

export interface SignInError {
  type: typeof AUTH_SIGN_IN_ERROR;
  error: CommonError;
}

export interface SignInData {
  type: typeof AUTH_SIGN_IN_DATA;
  payload: {
    email: string;
    isConfirmed: boolean;
  };
}

export interface SignUpFetch {
  type: typeof AUTH_SIGN_UP_FETCH;
  payload: {
    email: string;
    password: string;
  };
}

export interface SignUpData {
  type: typeof AUTH_SIGN_UP_DATA;
  payload: {
    userConfirmed: boolean;
    email: string;
  };
}

export interface SignUpError {
  type: typeof AUTH_SIGN_UP_ERROR;
  error: CommonError;
}

export interface CodeVerifyFetch {
  type: typeof AUTH_CODE_VERIFY_FETCH;
  payload: {
    email: string;
    code: string;
  };
}

export interface CodeVerifyData {
  type: typeof AUTH_CODE_VERIFY_DATA;
}

export interface CodeVerifyError {
  type: typeof AUTH_CODE_VERIFY_ERROR;
  error: CommonError;
}
export interface LogoutFetch {
  type: typeof AUTH_LOGOUT_FETCH;
}

export interface LogoutData {
  type: typeof AUTH_LOGOUT_DATA;
}

export interface LogoutFailed {
  type: typeof AUTH_LOGOUT_FAILURE;
  error: CommonError;
}

export interface ResendCodeFetch {
  type: typeof AUTH_RESEND_CODE_FETCH;
  payload: {
    email: string;
  };
}
export interface ResendCodeData {
  type: typeof AUTH_RESEND_CODE_DATA;
}

export interface ResendCodeError {
  type: typeof AUTH_RESEND_CODE_ERROR;
  error: CommonError;
}
export interface ChangePasswordFetch {
  type: typeof AUTH_CHANGE_PASSWORD_FETCH;
  payload: {
    oldPassword: string;
    newPassword: string;
  };
}
export interface ChangePasswordData {
  type: typeof AUTH_CHANGE_PASSWORD_DATA;
}
export interface ChangePasswordError {
  type: typeof AUTH_CHANGE_PASSWORD_ERROR;
  error: CommonError;
}
export interface ForgotPasswordFetch {
  type: typeof AUTH_FORGOT_PASSWORD_FETCH;
  payload: {
    username: string;
    code: string;
    newPassword: string;
  };
}
export interface ForgotPasswordData {
  type: typeof AUTH_FORGOT_PASSWORD_DATA;
}
export interface ForgotPasswordError {
  type: typeof AUTH_FORGOT_PASSWORD_ERROR;
  payload: CommonError;
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
  | LogoutData
  | CodeVerifyFetch
  | CodeVerifyData
  | CodeVerifyError
  | ResendCodeFetch
  | ResendCodeData
  | ResendCodeError
  | ChangePasswordFetch
  | ChangePasswordData
  | ChangePasswordError
  | ForgotPasswordFetch
  | ForgotPasswordData
  | ForgotPasswordError;

export const signInFetch = (payload: SignInFetch["payload"]): SignInFetch => ({
  type: AUTH_SIGN_IN_FETCH,
  payload,
});

export const signInData = (payload: SignInData["payload"]): SignInData => ({
  type: AUTH_SIGN_IN_DATA,
  payload,
});

export const signInError = (error: CommonError): SignInError => ({
  type: AUTH_SIGN_IN_ERROR,
  error,
});

export const signUpFetch = (payload: SignUpFetch["payload"]): SignUpFetch => ({
  type: AUTH_SIGN_UP_FETCH,
  payload,
});

export const signUpData = (payload: SignUpData["payload"]): SignUpData => ({
  type: AUTH_SIGN_UP_DATA,
  payload,
});

export const signUpError = (error: CommonError): SignUpError => ({
  type: AUTH_SIGN_UP_ERROR,
  error,
});

export const logOutFetch = (): LogoutFetch => ({
  type: AUTH_LOGOUT_FETCH,
});

export const logOutData = (): LogoutData => ({
  type: AUTH_LOGOUT_DATA,
});

export const logOutError = (error: CommonError): LogoutFailed => ({
  type: AUTH_LOGOUT_FAILURE,
  error,
});

export const codeVerifyFetch = (payload: CodeVerifyFetch["payload"]): CodeVerifyFetch => ({
  type: AUTH_CODE_VERIFY_FETCH,
  payload,
});

export const codeVerifyData = (): CodeVerifyData => ({
  type: AUTH_CODE_VERIFY_DATA,
});

export const codeVerifyError = (error: CommonError): CodeVerifyError => ({
  type: AUTH_CODE_VERIFY_ERROR,
  error,
});

export const resendCodeFetch = (payload: ResendCodeFetch["payload"]): ResendCodeFetch => ({
  type: AUTH_RESEND_CODE_FETCH,
  payload,
});

export const resendCodeData = (): ResendCodeData => ({
  type: AUTH_RESEND_CODE_DATA,
});

export const resendCodeError = (error: CommonError): ResendCodeError => ({
  type: AUTH_RESEND_CODE_ERROR,
  error,
});

export const changePasswordFetch = (
  payload: ChangePasswordFetch["payload"]
): ChangePasswordFetch => ({
  type: AUTH_CHANGE_PASSWORD_FETCH,
  payload,
});

export const changePasswordData = (): ChangePasswordData => ({
  type: AUTH_CHANGE_PASSWORD_DATA,
});

export const changePasswordError = (error: CommonError): ChangePasswordError => ({
  type: AUTH_CHANGE_PASSWORD_ERROR,
  error,
});

export const forgotPasswordFetch = (
  payload: ForgotPasswordFetch["payload"]
): ForgotPasswordFetch => ({
  type: AUTH_FORGOT_PASSWORD_FETCH,
  payload,
});

export const forgotPasswordData = (): ForgotPasswordData => ({
  type: AUTH_FORGOT_PASSWORD_DATA,
});

export const forgotPasswordError = (error: CommonError): ForgotPasswordError => ({
  type: AUTH_FORGOT_PASSWORD_ERROR,
  payload: error,
});
