import { OrderCommon } from "@polkadex/orderbook/modules/types";

export type Props = {
  onCancel?: () => void;
} & Partial<OrderCommon>;
