import { Order } from "@orderbook/core/utils/orderbookService";

export const sortOrdersDescendingTime = (orders: Order[]) =>
  orders.sort((a, b) => {
    const timestampA = new Date(a.timestamp).getTime();
    const timestampB = new Date(b.timestamp).getTime();
    return timestampB - timestampA;
  });
