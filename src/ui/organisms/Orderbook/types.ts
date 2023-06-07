import { OrderBookState } from "@polkadex/orderbook/providers/public/orderBook/types";

export type Props = {
  isSell?: boolean;
  orders: OrderBookState["depth"]["bids"];
  lightMode?: boolean;
  precision?: number;
  loading?: boolean;
};
