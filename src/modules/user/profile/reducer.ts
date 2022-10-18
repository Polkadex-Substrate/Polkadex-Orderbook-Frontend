import { ProfileAction, AuthInfo, UserAccount } from "./actions";
import {
  PROFILE_USER_ERROR,
  PROFILE_USER_FETCH,
  PROFILE_USER_CHANGE_INIT_BANNER,
  PROFILE_USER_AUTH_DATA,
  PROFILE_USER_AUTH_FETCH,
  PROFILE_USER_DATA,
  PROFILE_USER_SELECT_ACCOUNT_DATA,
  PROFILE_USER_ACCOUNT_PUSH,
  PROFILE_USER_MAIN_ACCOUNT_PUSH,
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
    case PROFILE_USER_SELECT_ACCOUNT_DATA: {
      return {
        ...state,
        selectedAccount: action.payload,
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
    case PROFILE_USER_ACCOUNT_PUSH: {
      const newAccount = action.payload;
      const userAccounts = [...state.userData.userAccounts];
      const isPresent = userAccounts.find(
        ({ tradeAddress }) => tradeAddress === newAccount.tradeAddress
      );
      if (!isPresent) {
        return {
          ...state,
          userData: {
            ...state.userData,
            userAccounts: [...userAccounts, newAccount],
          },
        };
      }
      return state;
    }
    case PROFILE_USER_MAIN_ACCOUNT_PUSH: {
      const newMainAddress = action.payload;
      const mainAddresses = [...state.userData.mainAccounts];
      const isPresent = mainAddresses.find((address) => address === newMainAddress);
      if (!isPresent) {
        return {
          ...state,
          userData: {
            ...state.userData,
            mainAccounts: [...mainAddresses, newMainAddress],
          },
        };
      }
      return state;
    }
    default:
      return state;
  }
};
