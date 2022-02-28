import { OrderCommon } from "@polkadex/orderbook/modules/types";

export type Props = {
  orders: OrderCommon[];
  priceFixed: number;
  amountFixed: number;
};
