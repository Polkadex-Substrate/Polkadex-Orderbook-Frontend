export type CommonError = {
  code: number;
  message: string[];
};

export type CommonState = {
  error?: CommonError;
  loading?: boolean;
};
export type OrderStatus = "OPEN" | "CLOSED" | "Expired" | "CANCELLED" | "Failed";
export type OrderSide = "Sell" | "Buy";
export type OrderType = "LIMIT" | "MARKET";
export type OrderKind = "bid" | "ask";

export enum OrderTypeEnum  {
  LIMIT = "LIMIT",
  MARKET = "MARKET"
}

export enum OrderSideEnum  {
  Sell = "Sell",
  Buy = "Buy"
}

export enum OrderKindEnum  {
  Bid = "Bid",
  Ask = "Ask"
}


// TODO: Integrate new Types.
export interface OrderCommon {
  main_account: string;
  id: string;
  client_order_id: string;
  time: string;
  m: string; // marketid
  side: string;
  order_type: string;
  status: string;
  price: number;
  qty: number;
  avg_filled_price: string;
  filled_quantity: string;
  fee: string;
}
