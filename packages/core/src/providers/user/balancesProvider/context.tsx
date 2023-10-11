import { createContext } from "react";

import {
  BalancesContextProps,
  BalancesProviderProps,
  BalancesState,
} from "./types";

export const initialState: BalancesState = {
  loading: false,
  success: false,
  balances: [],
};

export const Context = createContext<BalancesContextProps>({
  ...initialState,
  getFreeProxyBalance: () => "",
  onChangeChainBalance: async () => {
    await new Promise((resolve) => resolve);
  },
});

export const Provider = ({ value, children }: BalancesProviderProps) => (
  <Context.Provider value={value}>{children}</Context.Provider>
);
