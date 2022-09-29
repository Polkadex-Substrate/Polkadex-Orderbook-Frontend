import { OrderCommon } from "@polkadex/orderbook/modules/types";

export const sortOrdersDescendingTime = (orders: OrderCommon[]) =>
  orders.sort((a, b) => {
    const timestampA = new Date(a.time).getTime();
    const timestampB = new Date(b.time).getTime();
    return timestampB - timestampA;
  });
