import { createContext } from "react";

import {
  OrderbookServiceContextProps,
  OrderbookServiceProviderProps,
  OrderbookServiceState,
} from "./types";

export const initialState: OrderbookServiceState = {
  markets: [],
  assets: [],
};
export const Context = createContext<OrderbookServiceContextProps>({
  ...initialState,
  isReady: false,
  enable: async () => {},
});

export const Provider = ({
  value,
  children,
}: OrderbookServiceProviderProps) => (
  <Context.Provider value={value}>{children}</Context.Provider>
);
