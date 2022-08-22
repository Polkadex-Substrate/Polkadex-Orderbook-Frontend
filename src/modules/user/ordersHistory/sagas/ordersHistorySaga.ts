// TODO: Create User middleware
import { call, put, select } from "redux-saga/effects";
import { API } from "aws-amplify";

import { userOrdersHistoryData } from "../actions";
import { alertPush, selectCurrentMainAccount, selectCurrentTradeAccount } from "../../../";
import { ProxyAccount } from "../../profile";
import { selectUserSession, UserSessionPayload } from "../../session";

import * as queries from "./../../../../graphql/queries";

import { OrderCommon } from "src/modules/types";
import { Utils } from "@polkadex/web-helpers";
import { subtractMonths } from "@polkadex/orderbook/helpers/substractMonths";

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
    const account: ProxyAccount = yield select(selectCurrentTradeAccount);
    if (account.address) {
      const userSession: UserSessionPayload = yield select(selectUserSession);
      // const { dateFrom, dateTo } = userSession;
      const dateTo = new Date().toISOString();
      const dateFrom = subtractMonths(1).toISOString();
      const orders: OrderCommon[] = yield call(fetchOrders, account.address, dateFrom, dateTo);
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
  dateFrom: string,
  dateTo: string
): Promise<OrderCommon[]> => {
  // TODO: make limit resonable by utilizing nextToken
  const dateFromStr = Utils.date.formatDateToISO(dateFrom);
  const dateToStr = Utils.date.formatDateToISO(dateTo);
  const res: any = await API.graphql({
    query: queries.listOrderHistorybyMainAccount,
    variables: {
      main_account: proxy_acc,
      from: dateFromStr,
      to: dateToStr,
      limit: 1000,
    },
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
    price: Utils.decimals.formatToNumber("0x" + order.p),
    qty: Utils.decimals.formatToNumber("0x" + order.q),
    avg_filled_price: Utils.decimals.formatToString("0x" + order.afp),
    filled_quantity: Utils.decimals.formatToString("0x" + order.fq),
    fee: Utils.decimals.formatToString("0x" + order.fee),
  }));

  return orders;
};
