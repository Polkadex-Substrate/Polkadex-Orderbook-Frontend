import { ProfileAction, AuthInfo, UserAccount } from "./actions";
import {
  PROFILE_USER_ERROR,
  PROFILE_USER_FETCH,
  PROFILE_USER_CHANGE_INIT_BANNER,
  PROFILE_USER_AUTH_DATA,
  PROFILE_USER_AUTH_FETCH,
  PROFILE_USER_DATA,
} from "./constants";

export interface ProfileState {
  authInfo: AuthInfo;
  userData: {
    userAccounts: UserAccount[];
    mainAccounts: string[];
  };
  selectedAccount: UserAccount;
  isAuthFetching: boolean;
  isAuthSuccess: boolean;
  isDataLoading: boolean;
  isDataSuccess: boolean;
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
  selectedAccount: {
    tradeAddress: "",
    mainAddress: "",
  },
  isAuthFetching: false,
  isAuthSuccess: false,
  isDataLoading: false,
  isDataSuccess: false,
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
    case PROFILE_USER_FETCH: {
      return {
        ...state,
        isDataLoading: true,
      };
    }
    case PROFILE_USER_ERROR: {
      return {
        ...state,
        isDataLoading: false,
      };
    }
    case PROFILE_USER_DATA: {
      return {
        ...state,
        isDataLoading: false,
        userData: action.payload,
      };
    }
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
