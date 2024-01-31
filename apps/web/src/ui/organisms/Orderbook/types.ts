export type Props = {
  market: string;
  isSell?: boolean;
  orders: string[][];
  lightMode?: boolean;
  pricePrecision?: number;
  qtyPrecision?: number;
  loading?: boolean;
  quoteUnit?: string;
  baseUnit?: string;
  bids: string[][];
  asks: string[][];
};
