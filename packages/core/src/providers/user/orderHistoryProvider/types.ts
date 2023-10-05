import { PropsWithChildren } from "react";

import { OrderCommon } from "../../types";

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
  isReverted: boolean | null;
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
  openOrders: OrderCommon[];
  loading: boolean;
  hasNextOrderHistoryPage: boolean | undefined;
  error: string;
  isOrderHistoryLoading: boolean;
  isOrderHistorySuccess: boolean;
  orderHistoryError?: string;
}

export interface onOrdersHistoryFetch {
  dateFrom: Date;
  dateTo: Date;
  tradeAddress: string;
  orderHistoryNextToken: string | null;
}

export type OrderHistoryContextProps = OrdersHistoryState & {
  onOpenOrdersHistoryFetch: () => void;
  onOrderUpdates: (value: SetOrder) => void;
  orderHistory: OrderCommon[];
  isMarketMatch: (value: OrderCommon) => boolean;
  openOrders: OrderCommon[];
  fetchNextOrderHistoryPage: () => void;
};

export type OrderHistoryProviderProps = PropsWithChildren<{
  value: OrderHistoryContextProps;
}>;
