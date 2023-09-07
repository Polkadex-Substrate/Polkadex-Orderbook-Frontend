import { OrderBookState } from "@orderbook/core/providers/public/orderBook";

export type Props = {
  isSell?: boolean;
  orders: OrderBookState["depth"]["bids"];
  lightMode?: boolean;
  precision?: number;
  loading?: boolean;
};
