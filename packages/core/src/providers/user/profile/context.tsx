import { createContext } from "react";
import {
  ProfileContextInterface,
  ProfileProviderProps,
} from "@orderbook/core/providers/user/profile/types";

export const Context = createContext<ProfileContextInterface>({
  onUserSelectAccount: () => {},
  onUserLogout: () => {},
  onUserChangeInitBanner: () => {},
  allAccounts: [],
  avatar: "",
  favoriteMarkets: [],
  isBannerShown: false,
  selectedAccount: { mainAddress: "", tradeAddress: "" },
  onUserSetAvatar: () => {},
  onUserFavoriteMarketPush: () => {},
});

export const Provider = ({ value, children }: ProfileProviderProps) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
