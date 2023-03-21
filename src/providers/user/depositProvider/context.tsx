import { createContext } from "react";

import { initialState } from "./reducer";
import { DepositContextProps, DepositProviderProps } from "./types";

export const Context = createContext<DepositContextProps>({
  ...initialState,
  onfetchDeposit: () => {},
});

export const Provider = ({ value, children }: DepositProviderProps) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
