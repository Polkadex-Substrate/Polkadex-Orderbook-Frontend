import { AuthState } from "./types";
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
  AUTH_USER_DATA,
} from "./constants";

const initialTemplate = {
  isLoading: false,
  message: null,
  isError: false,
  isSuccess: false,
};

export const initialState: AuthState = {
  user: null,
  email: "",
  userConfirmed: false,
  signin: { ...initialTemplate },
  signup: { ...initialTemplate },
  logout: { ...initialTemplate },
  forgotPassword: { ...initialTemplate, email: "" },
  changePassword: { ...initialTemplate },
};

export const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case AUTH_USER_DATA: {
      const { email, userConfirmed } = action.payload;
      return { ...state, email, userConfirmed };
    }
    case AUTH_SIGN_IN_FETCH:
      return { ...state, signin: { ...state.signin, isLoading: true } };
    case AUTH_SIGN_UP_FETCH:
      return { ...state, signup: { ...state.signup, isLoading: true } };
    case AUTH_SIGN_IN_DATA:
      return {
        ...state,
        signin: {
          ...state.signin,
          isLoading: false,
          isSuccess: true,
        },
        logout: { ...initialTemplate },
        userConfirmed: action.payload.isConfirmed,
        email: action.payload.email,
        user: action.payload.user,
      };
    case AUTH_SIGN_IN_ERROR:
      return {
        ...state,
        signin: { ...state.signin, isLoading: false, isError: true, message: action.error.message },
      };
    case AUTH_SIGN_UP_DATA: {
      const { email, userConfirmed } = action.payload;
      return {
        ...state,
        signup: { ...state.signup, isLoading: false, isSuccess: true },
        userConfirmed,
        email,
      };
    }
    case AUTH_CODE_VERIFY_DATA:
      return { ...state, userConfirmed: true };
    case AUTH_CODE_VERIFY_ERROR:
      return { ...state, userConfirmed: false };
    case AUTH_SIGN_UP_ERROR:
      return {
        ...state,
        signup: { ...state.signup, isLoading: false, isError: true, message: action.error.message },
      };
    case AUTH_LOGOUT_FETCH:
      return { ...state };
    case AUTH_LOGOUT_DATA:
      return { ...state, ...initialState, logout: { ...state.logout, isSuccess: true } };
    case AUTH_LOGOUT_FAILURE:
      return { ...state, logout: { ...state.logout, isError: true, message: action.error.message } };
    case AUTH_FORGOT_PASSWORD_FETCH:
      return { ...state, forgotPassword: { ...state.forgotPassword, isLoading: true } };
    case AUTH_FORGOT_PASSWORD_DATA:
      return {
        ...state,
        forgotPassword: {
          ...state.forgotPassword,
          isLoading: false,
          isSuccess: true,
          email: action.payload,
        },
      };
    case AUTH_FORGOT_PASSWORD_ERROR:
      return {
        ...state,
        forgotPassword: {
          ...state.forgotPassword,
          isLoading: false,
          isSuccess: false,
          isError: true,
        },
      };
    case AUTH_FORGOT_PASSWORD_CODE:
      return {
        ...state,
        forgotPassword: {
          ...state.forgotPassword,
          isLoading: true,
          email: action.payload,
        },
      };
    case AUTH_FORGOT_PASSWORD_RESET:
      return {
        ...state,
        forgotPassword: {
          ...state.forgotPassword,
          isLoading: false,
          isSuccess: false,
          email: action.payload ? "" : state.forgotPassword.email,
        },
      };
    case AUTH_CHANGE_PASSWORD_FETCH:
      return { ...state, changePassword: { ...state.changePassword, isLoading: true } };
    case AUTH_CHANGE_PASSWORD_DATA:
      return {
        ...state,
        changePassword: { ...state.changePassword, isLoading: false, isSuccess: true },
      };
    case AUTH_CHANGE_PASSWORD_ERROR:
      return {
        ...state,
        changePassword: {
          ...state.changePassword,
          isLoading: false,
          isSuccess: false,
          isError: true,
        },
      };
    default:
      return state;
  }
};
