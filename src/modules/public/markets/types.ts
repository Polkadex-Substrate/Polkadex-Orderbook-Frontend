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
  min_price: BigNumber;
  max_price: BigNumber;
  min_amount: BigNumber;
  amount_precision: number;
  price_precision: number;
  state?: string;
  filters?: MarketFilter[];
  tokenTickerName?: string;
  base_ticker: string;
  quote_ticker: string;
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
