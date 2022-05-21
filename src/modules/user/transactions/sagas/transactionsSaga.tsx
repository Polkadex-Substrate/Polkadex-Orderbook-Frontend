import { call, put, select } from "redux-saga/effects";
import axios from "axios";

import { transactionsData } from "../actions";
import { alertPush } from "../../../public/alertHandler";
import { selectUserInfo } from "../../profile";

// TODO: CHANGE TO USE SQL
export function* transactionsSaga() {
  console.log("transactions saga");
  try {
    const { address, keyringPair } = yield select(selectUserInfo);
    const transactions = yield call(fetchTransactions, address);
    yield put(transactionsData(transactions));
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
const fetchTransactions = async (address: string) => {
  const res: any = await axios.get("/api/user/transactions" + "148");
  console.log("transaction data=>", res.data.data);
  return res.data.data;
};
