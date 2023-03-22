import { createContext } from "react";

import { initialOrderBook } from "./reducer";
import { OrderBookContextProps, OrderBookProviderProps } from "./types";

export const Context = createContext<OrderBookContextProps>({
  ...initialOrderBook,
});

export const Provider = ({ value, children }: OrderBookProviderProps) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
