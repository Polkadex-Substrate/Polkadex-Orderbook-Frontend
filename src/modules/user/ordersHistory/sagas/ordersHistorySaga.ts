// TODO: Create User middleware
import { call, put, select } from "redux-saga/effects";
import axios from "axios";

import { userOrdersHistoryData, UserOrdersHistoryFetch } from "../actions";
import { alertPush } from "../../../";
import { selectUserInfo } from "../../profile";

import { OrderCommon } from "src/modules/types";

export function* ordersHistorySaga(action: UserOrdersHistoryFetch) {
  try {
    console.log("orderhistory saga called, fetching orderhistory from database");
    const { main_acc_id } = yield select(selectUserInfo);
    const transactions: OrderCommon[] = yield call(fetchTransactions, main_acc_id);
    console.log("transactions =>", transactions);
    yield put(userOrdersHistoryData({ list: transactions }));
  } catch (error) {
    yield put(
      alertPush({
        message: {
          title: "Something has gone wrong..",
          description: error.message,
        },
        type: "Error",
      })
    );
  }
}
const fetchTransactions = async (main_acc_id: string): Promise<OrderCommon[]> => {
  const res: any = await axios.get("/api/user/transactions/" + main_acc_id);
  const orders = res.data.data;
  return orders;
};
