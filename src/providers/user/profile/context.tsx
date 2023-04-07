import { createContext } from "react";

import { initialState } from "./reducer";
import { ProfileContextProps, ProfileProviderProps } from "./types";

export const Context = createContext<ProfileContextProps>({
  ...initialState,
  onUserSelectAccount: () => {},
  onUserAuth: () => {},
  onUserLogout: () => {},
  onUserChangeInitBanner: () => {},
  onUserAuthFetch: () => {},
  onUserProfileAccountPush: () => {},
  onUserProfileTradeAccountDelete: () => {},
  onUserProfileMainAccountPush: () => {},
  onUserAccountSelectFetch: () => {},
  onUserSetDefaultTradeAccount: () => {},
  onUserSetAvatar: () => {},
  onUserFavoriteMarketPush: () => {},
});

export const Provider = ({ value, children }: ProfileProviderProps) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
