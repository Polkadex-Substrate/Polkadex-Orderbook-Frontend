import { FC, PropsWithChildren } from "react";

export interface UserAccount {
  mainAddress: string; // the main address linked to the trade address
  tradeAddress: string;
}

export type ProfileContextState = {
  selectedAccount: UserAccount;
  allAccounts: UserAccount[];
  favoriteMarkets: string[];
  avatar: string | null;
  isBannerShown: boolean;
};

export type ProfileContextInterface = ProfileContextState & {
  onUserSelectAccount: (value: { tradeAddress: string }) => void;
  onUserLogout: () => void;
  onUserChangeInitBanner: (value?: boolean) => void;
  onUserSetAvatar: (value?: string) => void;
  onUserFavoriteMarketPush: (value: string) => void;
};

export type ProfileProviderProps = PropsWithChildren<{
  value: ProfileContextInterface;
}>;

export interface ProfileProps {
  onError?: (value: string) => void;
  onNotification?: (value: string) => void;
}

export type ProfileComponent = FC<PropsWithChildren<ProfileProps>>;
