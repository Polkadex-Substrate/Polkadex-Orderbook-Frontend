import { CommonError } from "../../types";

import { ProfileAction } from "./actions";
import {
  PROFILE_RESET_USER,
  PROFILE_USER_DATA,
  PROFILE_USER_ERROR,
  PROFILE_USER_FETCH,
  PROFILE_USER_LIST_DATA,
  PROFILE_USER_LIST_FETCH,
} from "./constants";

import { UserSkeleton } from "./";

import { ProxyAccount } from "@polkadex/orderbook-modules";

export interface ProfileState {
  allUsers: UserSkeleton[];
  userData: {
    user: ProxyAccount;
    error?: CommonError;
    isFetching: boolean;
    success?: boolean;
  };
}

const ifUserIsLoggedIn = () => {
  const csrfTokenExist = process.browser && localStorage.getItem("csrfToken");

  if (csrfTokenExist === null) {
    return false;
  }

  return true;
};
const initialUserList = [];

export const defaultUser = {
  username: "",
  address: "",
  password: "",
  keyringPair: {},
  email: "",
  level: 0,
  otp: false,
  role: "",
  state: "",
  uid: "",
  profiles: [],
  referal_uid: "",
  labels: [],
  phone: [],
  created_at: "",
  updated_at: "",
};

export const initialStateProfile: ProfileState = {
  allUsers: initialUserList,
  userData: {
    user: defaultUser,
    isFetching: ifUserIsLoggedIn(),
  },
};

export const userReducer = (state: ProfileState["userData"], action: ProfileAction) => {
  switch (action.type) {
    case PROFILE_USER_FETCH:
      return {
        ...state,
        isFetching: true,
      };
    case PROFILE_USER_DATA:
      return {
        ...state,
        isFetching: false,
        user: action.payload.user,
      };
    case PROFILE_USER_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case PROFILE_RESET_USER:
      return {
        ...state,
        user: initialStateProfile.userData.user,
      };
    default:
      return state;
  }
};

export const userListReducer = (state = initialUserList, action: ProfileAction) => {
  switch (action.type) {
    case PROFILE_USER_LIST_FETCH:
      return state;
    case PROFILE_USER_LIST_DATA: {
      return [...action.payload.userList];
    }
    default:
      return state;
  }
};

export const profileReducer = (state = initialStateProfile, action: ProfileAction) => {
  switch (action.type) {
    case PROFILE_USER_FETCH:
    case PROFILE_USER_DATA:
    case PROFILE_RESET_USER:
    case PROFILE_USER_ERROR: {
      const userState = { ...state.userData };
      return {
        ...state,
        userData: userReducer(userState, action),
      };
    }

    case PROFILE_USER_LIST_FETCH:
    case PROFILE_USER_LIST_DATA: {
      const allUsersState = { ...state.allUsers };
      return {
        ...state,
        allUsers: userListReducer(allUsersState, action),
      };
    }
    default:
      return state;
  }
};
