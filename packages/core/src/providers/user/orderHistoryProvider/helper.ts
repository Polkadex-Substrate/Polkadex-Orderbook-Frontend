import * as queries from "@orderbook/core/graphql/queries";
import {
  Utils,
  fetchAllFromAppSync,
  fetchBatchFromAppSync,
} from "@orderbook/core/helpers";

import { OrderCommon } from "../../types";

import { OrderHistoryResult, orderHistoryQueryResult } from "./types";

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
