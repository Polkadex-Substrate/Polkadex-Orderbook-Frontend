// TODO: Create User middleware
import { call, put, select } from "redux-saga/effects";

import { userOrdersHistoryData } from "../actions";
import { alertPush, SelectedAccount, selectUsingAccount } from "../../../";
import { selectUserSession, UserSessionPayload } from "../../session";

import * as queries from "./../../../../graphql/queries";

import { OrderCommon } from "src/modules/types";
import { Utils } from "@polkadex/web-helpers";
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

export function* ordersHistorySaga() {
  try {
    const account: SelectedAccount = yield select(selectUsingAccount);
    if (account.selectedTradeAddress) {
      const userSession: UserSessionPayload = yield select(selectUserSession);
      const { dateFrom, dateTo } = userSession;
      const orders: OrderCommon[] = yield call(
        fetchOrders,
        account.selectedTradeAddress,
        dateFrom,
        dateTo
      );
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
  const res: any = await sendQueryToAppSync(queries.listOrderHistorybyMainAccount, {
    main_account: proxy_acc,
    from: dateFromStr,
    to: dateToStr,
    limit: 1000,
  });
  const ordersRaw: orderHistoryQueryResult[] = res.data.listOrderHistorybyMainAccount.items;
  const orders: OrderCommon[] = ordersRaw.map((order: any) => ({
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
