import { createContext } from "react";

import { OrderbookServiceProviderProps, OrderbookServiceState } from "./types";

export const initialState: OrderbookServiceState = {
  isReady: false,
  markets: [],
  assets: [],
};
export const Context = createContext<OrderbookServiceState>({
  ...initialState,
});

export const Provider = ({
  value,
  children,
}: OrderbookServiceProviderProps) => (
  <Context.Provider value={value}>{children}</Context.Provider>
);
