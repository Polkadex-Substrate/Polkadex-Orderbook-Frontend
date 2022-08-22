import { CommonError } from "../../types";

import { ProfileAction, UserInfo } from "./actions";
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
  userData: UserInfo["payload"];
  isFetching: boolean;
  isSuccess: boolean;
}

const defaultUser: ProfileState["userData"] = {
  email: "",
  isConfirmed: false,
  isAuthenticated: false,
  userExists: false,
  session: null,
  jwt: "",
};

export const initialStateProfile: ProfileState = {
  userData: defaultUser,
  isFetching: false,
  isSuccess: false,
};

export const profileReducer = (state = initialStateProfile, action: ProfileAction) => {
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
        userData: action.payload,
        isSuccess: true,
      };
    case PROFILE_USER_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };

    default:
      return state;
  }
};
