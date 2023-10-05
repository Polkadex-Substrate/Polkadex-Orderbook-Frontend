import * as queries from "@orderbook/core/graphql/queries";
import {
  Utils,
  fetchAllFromAppSync,
  fetchBatchFromAppSync,
} from "@orderbook/core/helpers";

import { OrderCommon } from "../../types";

import { OrderHistoryResult, SetOrder, orderHistoryQueryResult } from "./types";

export const fetchOpenOrders = async (
  tradeAccount: string
): Promise<OrderCommon[]> => {
  const ordersRaw: orderHistoryQueryResult[] = await fetchAllFromAppSync(
    queries.listOpenOrdersByMainAccount,
    {
      main_account: tradeAccount,
      limit: 25,
    },
    "listOpenOrdersByMainAccount"
  );
  return ordersRaw.map((order) => ({
    main_account: tradeAccount,
    id: order.id,
    client_order_id: order.cid,
    time: new Date(Number(order.t)).toISOString(),
    m: order.m, // marketid
    side: order.s,
    order_type: order.ot,
    status: order.st,
    price: Number(order.p),
    qty: Number(order.q),
    avg_filled_price: order.afp,
    filled_quantity: order.fq,
    fee: order.fee,
  }));
};

export const fetchOrderHistory = async (
  tradeAddress: string,
  dateFrom: Date,
  dateTo: Date,
  nextTokenFetch: string | null
): Promise<{ orders: OrderCommon[]; nextToken: string | null }> => {
  const dateFromStr = Utils.date.formatDateToISO(dateFrom);
  const dateToStr = Utils.date.formatDateToISO(dateTo);
  const { response: ordersRaw, nextToken }: OrderHistoryResult =
    await fetchBatchFromAppSync(
      queries.listOrderHistorybyMainAccount,
      {
        main_account: tradeAddress,
        from: dateFromStr,
        to: dateToStr,
        limit: 30,
        nextToken: nextTokenFetch,
      },
      "listOrderHistorybyMainAccount"
    );

  return {
    nextToken,
    orders: ordersRaw.map((order) => ({
      main_account: tradeAddress,
      id: order.id,
      client_order_id: order.cid,
      time: new Date(Number(order.t)).toISOString(),
      m: order.m, // marketid
      side: order.s,
      order_type: order.ot,
      status: order.st,
      price: Number(order.p),
      qty: Number(order.q),
      avg_filled_price: order.afp,
      filled_quantity: order.fq,
      fee: order.fee,
      isReverted: order.isReverted,
    })),
  };
};

export function processOrderData(eventData: SetOrder): OrderCommon {
  const base = eventData.pair.base.asset;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const quote = eventData.pair.quote.asset;

  return {
    main_account: eventData.user,
    id: eventData.id.toString(),
    client_order_id: eventData.client_order_id,
    time: new Date(Number(eventData.timestamp)).toISOString(),
    m: `${base}-${quote}`, // marketid
    side: eventData.side,
    order_type: eventData.order_type,
    status: eventData.status.toUpperCase(),
    price: Number(eventData.price),
    qty: Number(eventData.qty),
    avg_filled_price: eventData.avg_filled_price.toString(),
    filled_quantity: eventData.filled_quantity.toString(),
    fee: eventData.fee.toString(),
  };
}
