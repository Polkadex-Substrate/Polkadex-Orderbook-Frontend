import _ from "lodash";
import { ProfileState } from "./types";
import { ProfileAction } from "./actions";
import {
  PROFILE_RESET_USER,
  PROFILE_USER_DATA,
  PROFILE_USER_ERROR,
  PROFILE_USER_FETCH,
  PROFILE_USER_CHANGE_INIT_BANNER,
  PROFILE_USER_AUTH_FETCH,
  PROFILE_USER_AUTH_DATA,
  PROFILE_USER_SELECT_ACCOUNT_DATA,
  PROFILE_USER_ACCOUNT_PUSH,
  PROFILE_USER_MAIN_ACCOUNT_PUSH,
  PROFILE_SET_DEFAULT_TRADE_ACCOUNT,
  PROFILE_USER_TRADE_ACCOUNT_DELETE,
  PROFILE_SET_PROFILE_AVATAR,
  PROFILE_USER_FAVORITE_MARKET_PUSH,
} from "./constants";

import { LOCAL_STORAGE_ID } from "@polkadex/web-constants";
import { randomAvatars } from "@polkadex/orderbook-ui/organisms/ChangeAvatar/randomAvatars";
const defaultAvatar = randomAvatars[1].id;

const initialTemplate = {
  isLoading: false,
  message: null,
  isError: false,
  isSuccess: false,
};

export const initialState: ProfileState = {
  authInfo: {
    isAuthenticated: false,
    userExists: false,
    session: null,
    jwt: "",
    shouldShowInitialBanner: false,
  },
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
  data: { ...initialTemplate },
  auth: { ...initialTemplate },
};

export const profileReducer = (state: ProfileState, action: ProfileAction) => {
  switch (action.type) {
    case PROFILE_USER_AUTH_FETCH:
      return {
        ...state,
        auth: { ...state.auth, isLoading: true },
      };
    case PROFILE_USER_AUTH_DATA: {
      return {
        ...state,
        auth: { ...state.auth, isLoading: false, isSuccess: true },
        authInfo: { ...state.authInfo, ...action.payload },
      };
    }
    case PROFILE_RESET_USER:
      return {
        ...initialState,
      };
    case PROFILE_USER_FETCH: {
      return {
        ...state,
        data: { ...state.data, isLaoding: true },
      };
    }
    case PROFILE_USER_ERROR: {
      return {
        ...state,
        data: { ...state.data, isLaoding: false, isError: true },
      };
    }
    case PROFILE_USER_DATA: {
      return {
        ...state,
        data: { ...state.data, isLaoding: false, isSuccess: true },
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
    case PROFILE_USER_CHANGE_INIT_BANNER: {
      return {
        ...state,
        authInfo: {
          ...state.authInfo,
          shouldShowInitialBanner: action.payload,
        },
      };
    }
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
