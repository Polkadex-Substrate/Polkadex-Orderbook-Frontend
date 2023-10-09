import { createContext } from "react";

import { OrderBookProviderProps, OrderBookState } from "./types";

export const initialOrderBook: OrderBookState = {
  depth: { asks: [], bids: [], loading: true },
};

export const Context = createContext<OrderBookState>({
  ...initialOrderBook,
});

export const Provider = ({ value, children }: OrderBookProviderProps) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
