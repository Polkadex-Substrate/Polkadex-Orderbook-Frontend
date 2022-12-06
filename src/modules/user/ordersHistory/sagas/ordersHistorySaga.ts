// TODO: Create User middleware
import { call, put } from "redux-saga/effects";

import { userOrdersHistoryData, UserOrdersHistoryFetch } from "../actions";
import { alertPush } from "../../../";

import * as queries from "./../../../../graphql/queries";

import { OrderCommon } from "src/modules/types";
import { Utils } from "@polkadex/web-helpers";
import { fetchAllFromAppSync } from "@polkadex/orderbook/helpers/appsync";

type orderHistoryQueryResult = {
  u: string;
  cid: string;
  id: string;
  t: string;
  m: string;
  s: string;
  ot: string;
  st: string;
  p: string;
  q: string;
  afp: string;
  fq: string;
  fee: string;
};

export function* ordersHistorySaga(action: UserOrdersHistoryFetch) {
  try {
    const { dateFrom, dateTo, tradeAddress } = action.payload;
    if (tradeAddress) {
      const orders: OrderCommon[] = yield call(fetchOrders, tradeAddress, dateFrom, dateTo);
      yield put(userOrdersHistoryData({ list: orders }));
    }
  } catch (error) {
    yield put(
      alertPush({
        message: {
          title: "Something has gone wrong (orderHistory)..",
          description: error.message,
        },
        type: "Error",
      })
    );
  }
}
const fetchOrders = async (
  proxy_acc: string,
  dateFrom: Date,
  dateTo: Date
): Promise<OrderCommon[]> => {
  // TODO: make limit resonable by utilizing nextToken
  const dateFromStr = Utils.date.formatDateToISO(dateFrom);
  const dateToStr = Utils.date.formatDateToISO(dateTo);
  const ordersRaw: orderHistoryQueryResult[] = await fetchAllFromAppSync(
    queries.listOrderHistorybyMainAccount,
    {
      main_account: proxy_acc,
      from: dateFromStr,
      to: dateToStr,
      limit: 100,
    },
    "listOrderHistorybyMainAccount"
  );
  const orders: OrderCommon[] = ordersRaw.map((order) => ({
    main_account: proxy_acc,
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

  return orders;
};
