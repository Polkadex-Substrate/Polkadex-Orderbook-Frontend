import { createContext } from "react";

import { initialState } from "./reducer";
import { RecentTradesContextProps, RecentTradesProviderProps } from "./types";

export const Context = createContext<RecentTradesContextProps>({
  ...initialState,
  recentTradesFetch: () => {},
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
