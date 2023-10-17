import { createContext } from "react";

import {
  TransactionsContextProps,
  TransactionsProviderProps,
  TransactionsState,
} from "./types";

export const initialState: TransactionsState = {
  loading: false,
  success: false,
  transactions: [],
};

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
