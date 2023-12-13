import { createContext } from "react";
import {
  ProfileContextInterface,
  ProfileProviderProps,
} from "@orderbook/core/providers/user/profile/types";

import { initialState } from "./reducer";

export const Context = createContext<ProfileContextInterface>({
  ...initialState,
  onUserSelectAccount: () => {},
  onUserLogout: () => {},
  onUserChangeInitBanner: () => {},
  onUserSetDefaultTradeAccount: () => {},
  onUserSetAvatar: () => {},
  onUserFavoriteMarketPush: () => {},
});

export const Provider = ({ value, children }: ProfileProviderProps) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
