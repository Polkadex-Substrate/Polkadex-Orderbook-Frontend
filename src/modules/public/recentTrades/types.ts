export interface PublicTrade {
  market_id: string;
  price: string;
  amount: string;
  timestamp: number;
  side?: "sell" | "buy";
}
