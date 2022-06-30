import { CommonState, OrderSide } from "../../types";
import { MarketId } from "../markets";

export interface OrderBookOrder {
  id: string;
  base_asset: number;
  order_side: OrderSide;
  amount: string;
  price: string;
  quote_asset: 1;
}
export interface OrderBookState extends CommonState {
  asks: string[][];
  bids: string[][];
}
export interface OrderBookDbState {
  price: string;
  qty: string;
  side: "Bid" | "Ask";
}
export interface OrderBookEntry extends CommonState {
  remaining_volume: string;
  volume: string;
}

export interface DepthState extends CommonState {
  asks: string[][];
  bids: string[][];
  loading?: boolean;
}

export interface DepthIncrementState {
  marketId?: MarketId;
  asks: string[][];
  bids: string[][];
  loading: boolean;
  sequence: number | null;
}

export interface DepthIncrementUpdateData {
  asks: string[][] | string[] | null;
  bids: string[][] | string[] | null;
  sequence: number | null;
}
