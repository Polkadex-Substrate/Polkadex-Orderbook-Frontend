import { CognitoUser } from "amazon-cognito-identity-js";

import { CommonError } from "../../types";

import { AuthAction } from "./actions";
import {
  AUTH_CODE_VERIFY_DATA,
  AUTH_LOGOUT_DATA,
  AUTH_LOGOUT_FAILURE,
  AUTH_LOGOUT_FETCH,
  AUTH_SIGN_IN_DATA,
  AUTH_SIGN_IN_ERROR,
  AUTH_SIGN_IN_FETCH,
  AUTH_SIGN_UP_DATA,
  AUTH_SIGN_UP_ERROR,
  AUTH_SIGN_UP_FETCH,
  AUTH_FORGOT_PASSWORD_FETCH,
  AUTH_FORGOT_PASSWORD_DATA,
  AUTH_FORGOT_PASSWORD_ERROR,
  AUTH_FORGOT_PASSWORD_CODE,
  AUTH_FORGOT_PASSWORD_RESET,
  AUTH_CHANGE_PASSWORD_FETCH,
  AUTH_CHANGE_PASSWORD_DATA,
  AUTH_CHANGE_PASSWORD_ERROR,
  AUTH_CODE_VERIFY_ERROR,
} from "./constants";

export interface AuthState {
  user?: CognitoUser;
  email: string;
  require2FA?: boolean;
  requireVerification?: boolean;
  userConfirmed: boolean;
  logoutError?: CommonError;
  authError?: CommonError;
  signUpError?: CommonError;
  current_password_entropy: number;
  signInLoading: boolean;
  signInSuccess: boolean;
  signUpLoading: boolean;
  signUpSuccess: boolean;
  forgotPasswordLoading: boolean;
  forgotPasswordSuccess: boolean;
  forgotPasswordEmail?: string;
  changePasswordLoading: boolean;
  changePasswordSuccess: boolean;
}

export const initialStateAuth: AuthState = {
  user: null,
  email: "",
  require2FA: false,
  requireVerification: false,
  userConfirmed: false,
  current_password_entropy: 0,
  signInLoading: false,
  signInSuccess: false,
  signUpLoading: false,
  signUpSuccess: false,
  forgotPasswordLoading: false,
  forgotPasswordSuccess: false,
  forgotPasswordEmail: "",
  changePasswordLoading: false,
  changePasswordSuccess: false,
};

export const authReducer = (state = initialStateAuth, action: AuthAction) => {
  switch (action.type) {
    case AUTH_SIGN_IN_FETCH:
      return { ...state, signInLoading: true };
    case AUTH_SIGN_IN_DATA:
      return {
        ...state,
        signInLoading: false,
        signInSuccess: action.payload.isConfirmed,
        email: action.payload.email,
        user: action.payload.user,
        userConfirmed: action.payload.isConfirmed,
      };
    case AUTH_SIGN_IN_ERROR:
      return { ...state, authError: action.error, signInLoading: false };
    case AUTH_SIGN_UP_FETCH:
      return { ...state, signUpLoading: true };
    case AUTH_SIGN_UP_DATA: {
      const { email, userConfirmed } = action.payload;
      return {
        ...state,
        signUpLoading: false,
        signUpSuccess: true,
        userConfirmed,
        email,
      };
    }
    case AUTH_CODE_VERIFY_DATA:
      return { ...state, userConfirmed: true };
    case AUTH_CODE_VERIFY_ERROR:
      return { ...state, userConfirmed: false };
    case AUTH_SIGN_UP_ERROR:
      return { ...state, signUpError: action.error, signUpLoading: false };
    case AUTH_LOGOUT_FETCH:
      return { ...state };
    case AUTH_LOGOUT_DATA: {
      return { ...state, ...initialStateAuth };
    }
    case AUTH_LOGOUT_FAILURE:
      return { ...state, logoutError: action.error };
    case AUTH_FORGOT_PASSWORD_FETCH:
      return { ...state, forgotPasswordLoading: true };
    case AUTH_FORGOT_PASSWORD_DATA:
      return { ...state, forgotPasswordLoading: false, forgotPasswordSuccess: true };
    case AUTH_FORGOT_PASSWORD_ERROR:
      return { ...state, forgotPasswordLoading: false, forgotPasswordSuccess: false };
    case AUTH_FORGOT_PASSWORD_CODE:
      return { ...state, forgotPasswordLoading: true, forgotPasswordEmail: action.payload };
    case AUTH_FORGOT_PASSWORD_RESET:
      return {
        ...state,
        forgotPasswordEmail: action.payload ? "" : state.forgotPasswordEmail,
        forgotPasswordLoading: false,
        forgotPasswordSuccess: false,
      };
    case AUTH_CHANGE_PASSWORD_FETCH:
      return { ...state, changePasswordLoading: true };
    case AUTH_CHANGE_PASSWORD_DATA:
      return { ...state, changePasswordLoading: false, changePasswordSuccess: true };
    case AUTH_CHANGE_PASSWORD_ERROR:
      return { ...state, changePasswordLoading: false, changePasswordSuccess: false };
    default:
      return state;
  }
};
