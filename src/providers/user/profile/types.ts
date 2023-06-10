import { FC, PropsWithChildren } from "react";

import { CommonActionState } from "../../types";

import * as A from "./actions";

export interface UserSelectAccount {
  tradeAddress: string;
}

export interface UserAccount {
  mainAddress: string; // the main address linked to the trade address
  tradeAddress: string;
}

export interface UserAuth {
  email: string;
  isConfirmed: boolean;
  isAuthenticated: boolean;
  userExists: boolean;
  jwt?: string;
}

export interface AuthInfo {
  isAuthenticated: boolean;
  userExists: boolean;
  session?: any;
  jwt?: string;
  shouldShowInitialBanner?: boolean;
}

export interface ProfileState {
  authInfo: AuthInfo;
  auth: CommonActionState;
  userData: {
    userAccounts?: UserAccount[];
    mainAccounts?: string[];
  };
  data: CommonActionState;
  userProfile?: {
    avatar?: string;
  };
  userMarket: {
    favoriteMarkets: string[];
  };
  selectedAccount: UserAccount;
  defaultTradeAccount: string;
}

export type ProfileProviderProps = PropsWithChildren<{
  value: ProfileContextProps;
}>;

export type ProfileContextProps = ProfileState & {
  onUserSelectAccount: (value: UserSelectAccount) => void;
  onUserAuth: (value: UserAuth) => void;
  onUserLogout: () => void;
  onUserChangeInitBanner: (value?: boolean) => void;
  onUserAuthFetch: () => void;
  onUserProfileAccountPush: (value: UserAccount) => void;
  onUserProfileTradeAccountDelete: (value: string) => void;
  onUserProfileMainAccountPush: (value: string) => void;
  onUserAccountSelectFetch: (value: A.UserAccountSelectFetch["payload"]) => void;
  onUserSetDefaultTradeAccount: (value: A.UserSetDefaultTradeAccount["payload"]) => void;
  onUserSetAvatar: (value?: A.UserSetAvatar["payload"]) => void;
  onUserFavoriteMarketPush: (value: A.UserFavoriteMarketPush["payload"]) => void;
};

export interface ProfileProps {
  onError?: (value: string) => void;
  onNotification?: (value: string) => void;
}

export type ProfileComponent = FC<PropsWithChildren<ProfileProps>>;
