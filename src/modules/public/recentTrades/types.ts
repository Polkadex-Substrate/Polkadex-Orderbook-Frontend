import { OrderSide } from "../../types";

export interface PublicTrade {
  market_id: string;
  price: string;
  amount: string;
  timestamp: number;
}
