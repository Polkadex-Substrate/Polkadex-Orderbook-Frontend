import { createContext } from "react";

import { initialState } from "./reducer";
import { TransactionsContextProps, TransactionsProviderProps } from "./types";

export const Context = createContext<TransactionsContextProps>({
  ...initialState,
  filterByType: null,
  onChangeFilterByType: () => {},
  search: null,
  onChangeSearch: () => {},
  allWithdrawals: [],
  readyWithdrawals: [],
  deposits: [],
  onTransactionsUpdate: () => {},
});

export const Provider = ({ value, children }: TransactionsProviderProps) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
