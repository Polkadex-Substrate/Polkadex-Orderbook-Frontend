import BigNumber from "bignumber.js";

export type MarketId = string;

export interface MarketFilterCustomStepRule {
  limit: string;
  step: string;
}

export interface MarketFilterCustomStep {
  type: string;
  rules: MarketFilterCustomStepRule[];
}

export interface MarketFilterSignificantDigit {
  type: string;
  digits: number;
}

export type MarketFilter = MarketFilterSignificantDigit | MarketFilterCustomStep;

export interface Market {
  id: MarketId;
  m: string; // id in terms of PDEX-1
  assetIdArray: string[];
  name: string;
  base_unit: string;
  quote_unit: string;
  min_price: number;
  max_price: number;
  min_amount: number;
  max_amount: number;
  base_precision: number;
  quote_precision: number;
  state?: string;
  filters?: MarketFilter[];
  tokenTickerName?: string;
  base_ticker: string;
  quote_ticker: string;
  price_tick_size: number;
  qty_step_size: number;
}

export interface Ticker {
  m: string; // eg "PDEX-1"
  priceChange24Hr: string;
  priceChangePercent24Hr: string;
  open: string;
  close: string;
  high: string;
  low: string;
  volumeBase24hr: string;
  volumeQuote24Hr: string;
}
export interface TickerEvent {
  amount: string;
  name: string;
  base_unit: string;
  quote_unit: string;
  low: string;
  high: string;
  open: number;
  last: string;
  avg_price: string;
  price_change_percent: string;
  volume: string;
  at: number;
}

export interface MarketPriceInterface {
  price: string;
  created_at: string;
  updated_at: string;
}

export interface MarketQueryResult {
  market: string;
  max_order_qty: number;
  max_order_price: number;
  min_order_qty: number;
  min_order_price: number;
  price_tick_size: number;
  qty_step_size: number;
  quote_asset_precision: number;
}
