import { OrderCommon } from "@polkadex/orderbook/modules/types";

export const sortOrdersDescendingTime = (orders: OrderCommon[]) =>
  orders.sort((a, b) => {
    const timestampA = parseFloat(a.timestamp) * 1000;
    const timestampB = parseFloat(b.timestamp) * 1000;
    return timestampB - timestampA;
  });
