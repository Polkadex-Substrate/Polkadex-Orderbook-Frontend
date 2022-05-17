import { OrderSide } from "../../types";

export interface PublicTradeEvent {
  timestamp: number;
  taker_type: "buy" | "sell";
  date: number;
  price: string;
  amount: string;
}
export interface PublicTrade {
  market_id: string;
  price: string;
  order_side: OrderSide;
  amount: string;
  timestamp: number;
}
