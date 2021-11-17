import { CommonError } from "../../types";

import { AuthAction } from "./actions";
import {
  AUTH_LOGOUT_FAILURE,
  AUTH_LOGOUT_FETCH,
  AUTH_SIGN_IN_DATA,
  AUTH_SIGN_IN_ERROR,
  AUTH_SIGN_IN_FETCH,
  AUTH_SIGN_UP_DATA,
  AUTH_SIGN_UP_ERROR,
  AUTH_SIGN_UP_FETCH,
} from "./constants";

export interface AuthState {
  require2FA?: boolean;
  requireVerification?: boolean;
  emailVerified?: boolean;
  logoutError?: CommonError;
  authError?: CommonError;
  signUpError?: CommonError;
  current_password_entropy: number;
  signInLoading: boolean;
  signUpLoading: boolean;
  signUpSuccess: boolean;
}

export const initialStateAuth: AuthState = {
  require2FA: false,
  requireVerification: false,
  emailVerified: false,
  current_password_entropy: 0,
  signInLoading: false,
  signUpLoading: false,
  signUpSuccess: false,
};

export const authReducer = (state = initialStateAuth, action: AuthAction) => {
  switch (action.type) {
    case AUTH_SIGN_IN_FETCH:
      return { ...state, signInLoading: true };
    case AUTH_SIGN_IN_DATA:
      return { ...state, signInLoading: false };
    case AUTH_SIGN_IN_ERROR:
      return { ...state, authError: action.error, signInLoading: false };
    case AUTH_SIGN_UP_FETCH:
      return { ...state, signUpLoading: true };
    case AUTH_SIGN_UP_DATA:
      return { ...state, signUpLoading: false, signUpSuccess: true };
    case AUTH_SIGN_UP_ERROR:
      return { ...state, signUpError: action.error, signUpLoading: false };
    case AUTH_LOGOUT_FETCH:
      return { ...state };
    case AUTH_LOGOUT_FAILURE:
      return { ...state, logoutError: action.error };
    default:
      return state;
  }
};
