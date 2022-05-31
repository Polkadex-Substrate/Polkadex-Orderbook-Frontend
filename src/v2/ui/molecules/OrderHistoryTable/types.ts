import { IPublicAsset } from "@polkadex/orderbook/modules/public/assets";
import { OrderCommon } from "@polkadex/orderbook/modules/types";

export type Props = {
  orders: OrderCommon[];
  priceFixed: number;
  amountFixed: number;
  getAsset: (id: string) => IPublicAsset;
};
