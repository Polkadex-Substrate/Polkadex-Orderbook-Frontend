import { CommonError } from "../../types";

import {
  PROFILE_USER_DATA,
  PROFILE_USER_ERROR,
  PROFILE_USER_FETCH,
  PROFILE_USER_LIST_DATA,
  PROFILE_USER_LIST_FETCH,
} from "./constants";
import { ProxyAccount, UserSkeleton } from "./types";

export interface UserFetch {
  type: typeof PROFILE_USER_FETCH;
}

export interface UserInfo {
  type: typeof PROFILE_USER_DATA;
  payload: {
    user: ProxyAccount;
  };
}
export interface UserListData {
  type: typeof PROFILE_USER_LIST_DATA;
  payload: {
    userList: Array<UserSkeleton>;
  };
}
export interface UserListFetch {
  type: typeof PROFILE_USER_LIST_FETCH;
}

export interface UserError {
  type: typeof PROFILE_USER_ERROR;
  error: CommonError;
}

export type ProfileAction = UserFetch | UserInfo | UserError | UserListFetch | UserListData;

export const userFetch = (): UserFetch => ({
  type: PROFILE_USER_FETCH,
});

export const userData = (payload: UserInfo["payload"]): UserInfo => ({
  type: PROFILE_USER_DATA,
  payload,
});

export const userListFetch = (): UserListFetch => ({
  type: PROFILE_USER_LIST_FETCH,
});
export const userListData = (payload: UserListData["payload"]): UserListData => ({
  type: PROFILE_USER_LIST_DATA,
  payload,
});

export const userError = (error: CommonError): UserError => ({
  type: PROFILE_USER_ERROR,
  error,
});
