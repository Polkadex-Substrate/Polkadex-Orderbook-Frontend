import { createContext } from "react";

import {
  RecentTradesContextProps,
  RecentTradesProviderProps,
  RecentTradesState,
} from "./types";

export const initialState: RecentTradesState = {
  list: [],
  loading: true,
};

export const Context = createContext<RecentTradesContextProps>({
  ...initialState,
  isDecreasing: [],
  quoteUnit: "",
  baseUnit: "",
  pricePrecision: 0,
  amountPrecision: 0,
  getCurrentTradePrice: () => "",
  getLastTradePrice: () => "",
});

export const Provider = ({ value, children }: RecentTradesProviderProps) => (
  <Context.Provider value={value}>{children}</Context.Provider>
);
