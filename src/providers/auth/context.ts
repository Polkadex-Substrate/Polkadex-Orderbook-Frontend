import { createContext } from "react";

import { initialState } from "./reducer";
import { AuthContextProps, AuthProviderProps } from "./types";

export const Context = createContext<AuthContextProps>({
  ...initialState,
});

export const Provider = ({ value, children }: AuthProviderProps) => {
  return <Context.Provider value={value}>{children}</Context.Provider>
};
