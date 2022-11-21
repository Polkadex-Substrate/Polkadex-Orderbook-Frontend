import _ from "lodash";
import { HYDRATE } from "next-redux-wrapper";

import { AuthInfo, ProfileAction, UserAccount } from "./actions";
import {
  PROFILE_SET_DEFAULT_TRADE_ACCOUNT,
  PROFILE_USER_ACCOUNT_PUSH,
  PROFILE_USER_AUTH_DATA,
  PROFILE_USER_AUTH_FETCH,
  PROFILE_USER_CHANGE_INIT_BANNER,
  PROFILE_USER_DATA,
  PROFILE_USER_ERROR,
  PROFILE_USER_FETCH,
  PROFILE_USER_MAIN_ACCOUNT_PUSH,
  PROFILE_USER_SELECT_ACCOUNT_DATA,
  PROFILE_USER_TRADE_ACCOUNT_DELETE,
  PROFILE_RESET_USER,
  PROFILE_SET_PROFILE_AVATAR,
  PROFILE_USER_FAVORITE_MARKET_PUSH,
} from "./constants";

import { LOCAL_STORAGE_ID } from "@polkadex/web-constants";
import { randomAvatars } from "@polkadex/orderbook-ui/organisms/ChangeAvatar/randomAvatars";
const defaultAvatar = randomAvatars[1].id;
export interface ProfileState {
  authInfo: AuthInfo;
  userData: {
    userAccounts: UserAccount[];
    mainAccounts: string[];
  };
  userProfile?: {
    avatar?: string;
  };
  userMarket: {
    favoriteMarkets: string[];
  };
  selectedAccount: UserAccount;
  defaultTradeAccount: string;
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
  userProfile: {
    avatar: defaultAvatar.toString(),
  },
  selectedAccount: {
    tradeAddress: "",
    mainAddress: "",
  },
  defaultTradeAccount: "",
  userMarket: {
    favoriteMarkets: [],
  },
  isAuthFetching: false,
  isAuthSuccess: false,
  isDataLoading: false,
  isDataSuccess: false,
};

export const profileReducer = (state = initialStateProfile, action: ProfileAction) => {
  switch (action.type) {
    case HYDRATE: {
      const { profile } = action.payload.user;
      return {
        ...state,
        authInfo: {
          ...profile.authInfo,
        },
        userData: {
          ...profile.userData,
        },
      };
    }
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
    case PROFILE_RESET_USER:
      return {
        ...initialStateProfile,
      };
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
    case PROFILE_USER_FAVORITE_MARKET_PUSH: {
      const currentFavorites = [...state.userMarket.favoriteMarkets];
      const favoriteMarketId = action.payload;
      const isPresent = currentFavorites.includes(favoriteMarketId);
      if (isPresent) {
        currentFavorites.splice(currentFavorites.indexOf(favoriteMarketId), 1);
      } else {
        currentFavorites.push(favoriteMarketId);
      }
      return {
        ...state,
        userMarket: {
          favoriteMarkets: currentFavorites,
        },
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
    case PROFILE_SET_DEFAULT_TRADE_ACCOUNT: {
      const tradeAddress = action.payload;
      window.localStorage.setItem(LOCAL_STORAGE_ID.DEFAULT_TRADE_ACCOUNT, tradeAddress);
      return {
        ...state,
        defaultTradeAccount: tradeAddress,
      };
    }
    case PROFILE_SET_PROFILE_AVATAR: {
      const userAvatar = window.localStorage.getItem(LOCAL_STORAGE_ID.DEFAULT_AVATAR);
      const hasAvatar = !!action?.payload?.length;
      if (hasAvatar)
        window.localStorage.setItem(LOCAL_STORAGE_ID.DEFAULT_AVATAR, action.payload);

      if (!userAvatar)
        window.localStorage.setItem(LOCAL_STORAGE_ID.DEFAULT_AVATAR, defaultAvatar.toString());

      return {
        ...state,
        userProfile: {
          avatar:
            hasAvatar || userAvatar ? action?.payload || userAvatar : defaultAvatar.toString(),
        },
      };
    }

    case PROFILE_USER_TRADE_ACCOUNT_DELETE: {
      const address = action.payload;
      const userAccounts = [...state.userData.userAccounts];
      const updateState = _.cloneDeep(state);
      const filtered = userAccounts.filter(({ tradeAddress }) => tradeAddress !== address);
      if (state.defaultTradeAccount === address) {
        updateState.defaultTradeAccount = "";
        window.localStorage.setItem(LOCAL_STORAGE_ID.DEFAULT_TRADE_ACCOUNT, "");
      }
      if (state.selectedAccount.tradeAddress === address) {
        updateState.selectedAccount = null;
      }
      updateState.userData.userAccounts = filtered;
      return updateState;
    }
    default:
      return state;
  }
};
