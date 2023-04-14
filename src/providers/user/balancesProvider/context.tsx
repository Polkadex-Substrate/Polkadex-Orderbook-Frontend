import { createContext } from "react";

import { initialState } from "./reducer";
import { BalancesContextProps, BalancesProviderProps } from "./types";

export const Context = createContext<BalancesContextProps>({
  ...initialState,
  getFreeProxyBalance: () => "",
  onBalanceUpdate: () => {},
});

export const Provider = ({ value, children }: BalancesProviderProps) => (
  <Context.Provider value={value}>{children}</Context.Provider>
);
