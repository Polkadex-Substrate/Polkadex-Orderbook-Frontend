import { call, put, select } from "redux-saga/effects";
import { API } from "aws-amplify";

import { transactionsData, TransactionsFetch } from "../actions";
import { alertPush } from "../../../public/alertHandler";
import { selectUserInfo } from "../../profile";
import * as queries from "../../../../graphql/queries";

import { subtractMonths } from "@polkadex/orderbook/helpers/substractMonths";
import { formatAddressToDefault } from "@polkadex/orderbook/helpers/formatAddress";

export function* transactionsSaga(action: TransactionsFetch) {
  try {
    const { main_addr } = yield select(selectUserInfo);
    const transactions = yield call(fetchTransactions, main_addr, 3, 10);
    yield put(transactionsData(transactions));
  } catch (error) {
    console.error(error);
    yield put(
      alertPush({
        message: {
          title: "Something has gone wrong (transactions)..",
          description: error.message,
        },
        type: "Error",
      })
    );
  }
}
const fetchTransactions = async (address: string, monthsBefore: number, limit = 10) => {
  const fromDate = subtractMonths(monthsBefore);
  const res: any = await API.graphql({
    query: queries.listTransactionsByMainAccount,
    variables: {
      main_account: formatAddressToDefault(address),
      from: fromDate.toISOString(),
      to: new Date().toISOString(),
    },
  });
  const txs = res.data.listTransactionsByMainAccount.items;
  return txs;
};
