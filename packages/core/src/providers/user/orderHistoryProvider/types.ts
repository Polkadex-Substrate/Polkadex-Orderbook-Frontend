import { PropsWithChildren } from "react";

import { CommonError, OrderCommon, Ifilters } from "../../types";

export type orderHistoryQueryResult = {
  u: string;
  cid: string;
  id: string;
  t: string;
  m: string;
  s: string;
  ot: string;
  st: string;
  p: string;
  q: string;
  afp: string;
  fq: string;
  fee: string;
};

export type OrderHistoryResult = {
  response: orderHistoryQueryResult[];
  nextToken: string | null;
};

export type OrderHistoryFetchResult = {
  nextToken: string | null;
  orders: OrderCommon[];
};

export interface SetOrder {
  stid: number;
  client_order_id: string;
  avg_filled_price: number;
  fee: number;
  filled_quantity: number;
  status: string;
  id: number;
  user: string;
  pair: Pair;
  side: string;
  order_type: string;
  qty: number;
  price: number;
  timestamp: number;
}

interface Pair {
  base: {
    asset: number;
  };
  quote: {
    asset: number;
  };
}

export interface OrdersHistoryState {
  list: OrderCommon[];
  openOrders: OrderCommon[];
  loading: boolean;
  pageIndex: number;
  success: boolean;
  orderHistoryNextToken: string | null;
  error?: CommonError;
}

export interface onOrdersHistoryFetch {
  dateFrom: Date;
  dateTo: Date;
  tradeAddress: string;
  orderHistoryNextToken: string | null;
}

export type OrderHistoryContextProps = OrdersHistoryState & {
  onOpenOrdersHistoryFetch: () => void;
  onOrdersHistoryFetch: (value: onOrdersHistoryFetch) => void;
  onOrderUpdates: (value: SetOrder) => void;
  orders: OrderCommon[];
  openOrders: OrderCommon[];
  userLoggedIn: boolean;
  filterOrders: (value: Ifilters) => void;
};

export type OrderHistoryProviderProps = PropsWithChildren<{
  value: OrderHistoryContextProps;
}>;