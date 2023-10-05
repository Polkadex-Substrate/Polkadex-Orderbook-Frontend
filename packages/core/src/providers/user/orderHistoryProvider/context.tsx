import { createContext } from "react";

import { initialOrdersHistoryState } from "./reducer";
import { OrderHistoryContextProps, OrderHistoryProviderProps } from "./types";

export const Context = createContext<OrderHistoryContextProps>({
  ...initialOrdersHistoryState,
  onOpenOrdersHistoryFetch: () => {},
  onOrderUpdates: () => {},
  orderHistory: [],
  isMarketMatch: () => {},
  openOrders: [],
  userLoggedIn: false,
  fetchNextOrderHistoryPage: () => {},
});

export const Provider = ({ value, children }: OrderHistoryProviderProps) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
