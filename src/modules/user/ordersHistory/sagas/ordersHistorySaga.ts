// TODO: Create User middleware
import { call, put, select } from "redux-saga/effects";
import { API } from "aws-amplify";

import { userOrdersHistoryData } from "../actions";
import { alertPush, selectCurrentMainAccount, selectCurrentTradeAccount } from "../../../";
import { ProxyAccount, selectUserInfo } from "../../profile";
import { selectUserSession, UserSessionPayload } from "../../session";

import * as queries from "./../../../../graphql/queries";

import { OrderCommon } from "src/modules/types";

export function* ordersHistorySaga() {
  try {
    const account: ProxyAccount = yield select(selectCurrentTradeAccount);
    if (account.address) {
      const userSession: UserSessionPayload = yield select(selectUserSession);
      const { dateFrom, dateTo } = userSession;
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
  const res: any = await API.graphql({
    query: queries.listOrderHistorybyMainAccount,
    variables: {
      main_account: proxy_acc,
      from: dateFrom,
      to: dateTo,
    },
  });
  const orders = res.data.listOrderHistorybyMainAccount.items;
  return orders;
};
