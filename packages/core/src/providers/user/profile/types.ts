import { FC, PropsWithChildren } from "react";
import { ExtensionAccount } from "@orderbook/core/providers/types";

export interface UserAddressTuple {
  mainAddress: string; // the main address linked to the trade address
  tradeAddress: string;
}

export type ProfileContextState = {
  selectedAddresses: UserAddressTuple;
  allAccounts: UserAddressTuple[];
  favoriteMarkets: string[];
  avatar: string | null;
  isBannerShown: boolean;
};

export type ProfileContextInterface = ProfileContextState & {
  onUserSelectTradingAddress: (value: { tradeAddress: string }) => void;
  onUserSelectMainAddress: (value: { mainAddress: string }) => void;
  onUserLogout: () => void;
  onUserChangeInitBanner: (value?: boolean) => void;
  onUserSetAvatar: (value?: string) => void;
  onUserFavoriteMarketPush: (value: string) => void;
  getSigner: (address: string) => any;
};

export type ProfileProviderProps = PropsWithChildren<{
  value: ProfileContextInterface;
}>;

export interface ProfileProps {
  onError?: (value: string) => void;
  onNotification?: (value: string) => void;
}

export type ProfileComponent = FC<PropsWithChildren<ProfileProps>>;
