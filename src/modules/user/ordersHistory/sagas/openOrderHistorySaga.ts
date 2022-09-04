// TODO: Create User middleware
import { call, put, select } from "redux-saga/effects";
import { API } from "aws-amplify";

import { userOpenOrderHistoryData, UserOpenOrdersHistoryFetch } from "../actions";
import { alertPush, selectCurrentTradeAccount } from "../../../";
import { ProxyAccount } from "../../profile";

import * as queries from "./../../../../graphql/queries";

import { OrderCommon } from "src/modules/types";
import { Utils } from "@polkadex/web-helpers";

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

export function* openOrdersHistorySaga(action: UserOpenOrdersHistoryFetch) {
  try {
    const account: ProxyAccount = yield select(selectCurrentTradeAccount);
    if (account.address) {
      const transactions: OrderCommon[] = yield call(fetchOpenOrders, account.address);
      yield put(userOpenOrderHistoryData({ list: transactions }));
    }
  } catch (error) {
    console.error(error);
    yield put(
      alertPush({
        message: {
          title: "Something has gone wrong (openOrderHistory)..",
          description: error.message,
        },
        type: "Error",
      })
    );
  }
}
const fetchOpenOrders = async (proxy_acc: string): Promise<OrderCommon[]> => {
  const res: any = await API.graphql({
    query: queries.listOpenOrdersByMainAccount,
    variables: { main_account: proxy_acc, limit: 1000 },
  });
  const ordersRaw: orderHistoryQueryResult[] = res.data.listOpenOrdersByMainAccount.items;
  const orders = ordersRaw.map((order) => ({
    main_account: proxy_acc,
    id: order.id,
    client_order_id: order.cid,
    time: new Date(Number(order.t)).toISOString(),
    m: order.m, // marketid
    side: order.s,
    order_type: order.ot,
    status: order.st,
    price: Utils.decimals.formatToNumber(order.p),
    qty: Utils.decimals.formatToNumber(order.q),
    avg_filled_price: Utils.decimals.formatToString(order.afp),
    filled_quantity: Utils.decimals.formatToString(order.fq),
    fee: Utils.decimals.formatToString(order.fee),
  }));
  return orders;
};
