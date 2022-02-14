import { DepthState } from "@polkadex/orderbook-modules";

export type Props = {
  isSell?: boolean;
  orders: DepthState["bids"];
};
