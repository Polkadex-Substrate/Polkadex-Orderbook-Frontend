import { OrderSide } from "../../types";

export interface PublicTradeEvent {
  tid: number;
  taker_type: "buy" | "sell";
  date: number;
  price: string;
  amount: string;
}
export interface PublicTrade {
  market_id: [{ Asset: number }, { Asset: number }];
  price: string;
  order_side: OrderSide;
  amount: string;
  timestamp: number;
}
