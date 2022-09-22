export interface PublicTrade {
  market_id: string;
  price: string;
  amount: string;
  timestamp: string;
  side?: "sell" | "buy";
}
