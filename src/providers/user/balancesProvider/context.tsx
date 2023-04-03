import { createContext } from "react";

import { initialState } from "./reducer";
import { BalancesContextProps, BalancesProviderProps } from "./types";

export const Context = createContext<BalancesContextProps>({
  ...initialState,
  dispatchBalancesFetch: () => {},
});

export const Provider = ({ value, children }: BalancesProviderProps) => (
  <Context.Provider value={value}>{children}</Context.Provider>
);
