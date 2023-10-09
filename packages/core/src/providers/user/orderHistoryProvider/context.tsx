import { createContext } from "react";

import {
  OrderHistoryContextProps,
  OrderHistoryProviderProps,
  OrdersHistoryState,
} from "./types";

export const initialOrdersHistoryState: OrdersHistoryState = {
  openOrders: [],
  isOrderHistorySuccess: false,
  isOrderHistoryLoading: false,
  hasNextOrderHistoryPage: undefined,
  orderHistoryError: undefined,
  isOpenOrdersLoading: false,
};

export const Context = createContext<OrderHistoryContextProps>({
  ...initialOrdersHistoryState,
  onOrderUpdates: () => {},
  orderHistory: [],
  isMarketMatch: () => false,
  openOrders: [],
  fetchNextOrderHistoryPage: () => {},
});

export const Provider = ({ value, children }: OrderHistoryProviderProps) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
