import { OrderCommon } from "@polkadex/orderbook/modules/types";

export const sortOrdersDescendingTime = (orders: OrderCommon[]) =>
  orders.sort((a, b) => {
    const timestampA = new Date(a.timestamp).getTime();
    const timestampB = new Date(b.timestamp).getTime();
    return timestampB - timestampA;
  });
