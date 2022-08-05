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
} from "./constants";

export interface AuthState {
  email: string;
  require2FA?: boolean;
  requireVerification?: boolean;
  userConfirmed?: boolean;
  logoutError?: CommonError;
  authError?: CommonError;
  signUpError?: CommonError;
  current_password_entropy: number;
  signInLoading: boolean;
  signInSuccess: boolean;
  signUpLoading: boolean;
  signUpSuccess: boolean;
}

export const initialStateAuth: AuthState = {
  email: "",
  require2FA: false,
  requireVerification: false,
  userConfirmed: false,
  current_password_entropy: 0,
  signInLoading: false,
  signInSuccess: false,
  signUpLoading: false,
  signUpSuccess: false,
};

export const authReducer = (state = initialStateAuth, action: AuthAction) => {
  switch (action.type) {
    case AUTH_SIGN_IN_FETCH:
      return { ...state, signInLoading: true };
    case AUTH_SIGN_IN_DATA:
      return {
        ...state,
        signInLoading: false,
        signInSuccess: true,
        email: action.payload.email,
        userConfirmed: true,
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
    case AUTH_SIGN_UP_ERROR:
      return { ...state, signUpError: action.error, signUpLoading: false };
    case AUTH_LOGOUT_FETCH:
      return { ...state };
    case AUTH_LOGOUT_DATA: {
      return { ...state, ...initialStateAuth };
    }
    case AUTH_LOGOUT_FAILURE:
      return { ...state, logoutError: action.error };
    default:
      return state;
  }
};
