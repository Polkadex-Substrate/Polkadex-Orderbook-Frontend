// TODO: Create User middleware
import { call, put, select } from "redux-saga/effects";
import { API } from "aws-amplify";

import { userOrdersHistoryData, UserOrdersHistoryFetch } from "../actions";
import { alertPush } from "../../../";
import { ProxyAccount, selectUserInfo } from "../../profile";

import * as queries from "./../../../../graphql/queries";

import { OrderCommon } from "src/modules/types";
import { subtractMonths } from "@polkadex/orderbook/helpers/substractMonths";

export function* ordersHistorySaga(action: UserOrdersHistoryFetch) {
  try {
    const account: ProxyAccount = yield select(selectUserInfo);
    if (account.address) {
      const orders: OrderCommon[] = yield call(fetchOrders, account.address, 1);
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
  monthsBefore: number,
  limit = 10
): Promise<OrderCommon[]> => {
  const fromDate = subtractMonths(monthsBefore);

  const res: any = await API.graphql({
    query: queries.listOrderHistorybyMainAccount,
    variables: {
      main_account: proxy_acc,
      from: fromDate.toISOString(),
      to: new Date().toISOString(),
    },
  });
  const orders = res.data.listOrderHistorybyMainAccount.items;
  return orders;
};
