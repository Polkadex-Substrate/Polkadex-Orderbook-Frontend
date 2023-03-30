import { createContext } from "react";

import { initialState } from "./reducer";
import { DepositContextProps, DepositProviderProps } from "./types";

export const Context = createContext<DepositContextProps>({
  ...initialState,
  onFetchDeposit: () => {},
  depositsLoading: () => false,
});

export const Provider = ({ value, children }: DepositProviderProps) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
