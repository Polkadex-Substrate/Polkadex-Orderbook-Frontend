import { createContext } from "react";

import { initialState } from "./reducer";
import { OrdersContextProps, OrdersProviderProps } from "./types";

export const Context = createContext<OrdersContextProps>({
  ...initialState,
  onPlaceOrders: () => {},
  onCancelOrder: () => {},
  onSetCurrentPrice: () => {},
  onSetCurrentAmount: () => {},
});

export const Provider = ({ value, children }: OrdersProviderProps) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
