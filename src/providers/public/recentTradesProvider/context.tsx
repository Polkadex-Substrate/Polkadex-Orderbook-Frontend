import { createContext } from "react";

import { initialState } from "./reducer";
import { RecentTradesContextProps, RecentTradesProviderProps } from "./types";

export const Context = createContext<RecentTradesContextProps>({
  ...initialState,
});

export const Provider = ({ value, children }: RecentTradesProviderProps) => (
  <Context.Provider value={value}>{children}</Context.Provider>
);
