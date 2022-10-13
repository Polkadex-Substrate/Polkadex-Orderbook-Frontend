// TODO: Create User middleware
import { call, put, select } from "redux-saga/effects";

import { userOpenOrderHistoryData, UserOpenOrdersHistoryFetch } from "../actions";
import { alertPush, UserAccount, selectUsingAccount } from "../../../";

import * as queries from "./../../../../graphql/queries";

import { OrderCommon } from "src/modules/types";
import { sendQueryToAppSync } from "@polkadex/orderbook/helpers/appsync";

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

export function* openOrdersHistorySaga(_action: UserOpenOrdersHistoryFetch) {
  try {
    const account: UserAccount = yield select(selectUsingAccount);
    if (account.tradeAddress) {
      const transactions: OrderCommon[] = yield call(fetchOpenOrders, account.tradeAddress);
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
  const res: any = await sendQueryToAppSync(queries.listOpenOrdersByMainAccount, {
    main_account: proxy_acc,
    limit: 1000,
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
    price: Number(order.p),
    qty: Number(order.q),
    avg_filled_price: order.afp,
    filled_quantity: order.fq,
    fee: order.fee,
  }));
  return orders;
};
