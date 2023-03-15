import { createContext } from "react";

import { initialState } from "./reducer";
import { ProfileContextProps, ProfileProviderProps } from "./types";

export const Context = createContext<ProfileContextProps>({
  ...initialState,
  onUserSelectAccount: () => {},
});

export const Provider = ({ value, children }: ProfileProviderProps) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
