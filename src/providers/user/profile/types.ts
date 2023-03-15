import { FC, PropsWithChildren } from "react";
import { CommonActionState } from "../types";

export interface UserSelectAccount {
  tradeAddress: string;
}

export interface UserAccount {
  mainAddress: string; // the main address linked to the trade address
  tradeAddress: string;
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
    userAccounts: UserAccount[];
    mainAccounts: string[];
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
  onUserAuth: () => void;
};

export interface ProfileProps {
  onError?: (value: string) => void;
}

export type ProfileComponent = FC<PropsWithChildren<ProfileProps>>;
