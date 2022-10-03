import { ProfileAction, AuthInfo, UserAccount } from "./actions";
import {
  PROFILE_USER_ERROR,
  PROFILE_USER_FETCH,
  PROFILE_USER_CHANGE_INIT_BANNER,
  PROFILE_USER_AUTH_DATA,
  PROFILE_USER_AUTH_FETCH,
} from "./constants";

export interface ProfileState {
  authInfo: AuthInfo;
  userData: {
    userAccounts: UserAccount[];
    mainAccounts: string[];
  };
  isAuthFetching: boolean;
  isAuthSuccess: boolean;
}

const defaultAuth: AuthInfo = {
  email: "",
  isConfirmed: false,
  isAuthenticated: false,
  userExists: false,
  session: null,
  jwt: "",
  shouldShowInitialBanner: false,
};

export const initialStateProfile: ProfileState = {
  authInfo: defaultAuth,
  userData: {
    userAccounts: [],
    mainAccounts: [],
  },
  isAuthFetching: false,
  isAuthSuccess: false,
};

export const profileReducer = (state = initialStateProfile, action: ProfileAction) => {
  switch (action.type) {
    case PROFILE_USER_AUTH_FETCH:
      return {
        ...state,
        isAuthFetching: true,
      };
    case PROFILE_USER_AUTH_DATA: {
      return {
        ...state,
        isAuthFetching: false,
        authInfo: action.payload,
        isAuthSuccess: true,
      };
    }
    case PROFILE_USER_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case PROFILE_USER_CHANGE_INIT_BANNER:
      return {
        ...state,
        userData: {
          ...state.userData,
          shouldShowInitialBanner: action.payload,
        },
      };
    default:
      return state;
  }
};
