import { FC, PropsWithChildren } from "react";

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
  selectedExtension: any | null;
};

export type ProfileContextInterface = ProfileContextState & {
  onUserSelectTradingAddress: (value: {
    tradeAddress: string;
    isNew?: true;
  }) => Promise<void>;
  onUserSelectMainAddress: (value: { mainAddress: string }) => void;
  onUserLogout: () => void;
  onUserResetMainAddress: () => void;
  onUserResetTradingAddress: () => void;
  onResetSelectedExtension: () => void;
  onUserChangeInitBanner: (value?: boolean) => void;
  onUserSetAvatar: (value?: string) => void;
  onUserFavoriteMarketPush: (value: string) => void;
  getSigner: (address: string) => any;
  setSelectedExtension: (value: any) => void;
};

export type ProfileProviderProps = PropsWithChildren<{
  value: ProfileContextInterface;
}>;

export interface ProfileProps {
  onError?: (value: string) => void;
  onNotification?: (value: string) => void;
}

export type ProfileComponent = FC<PropsWithChildren<ProfileProps>>;
