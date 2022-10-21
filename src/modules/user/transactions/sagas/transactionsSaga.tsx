import { call, put, select } from "redux-saga/effects";

import { transactionsData, TransactionsFetch } from "../actions";
import { alertPush } from "../../../public/alertHandler";
import * as queries from "../../../../graphql/queries";
import { Transaction } from "../reducer";
import { notificationPush } from "../../notificationHandler";

import { subtractMonths } from "@polkadex/orderbook/helpers/substractMonths";
import { sendQueryToAppSync } from "@polkadex/orderbook/helpers/appsync";
import { selectUsingAccount, UserAccount } from "@polkadex/orderbook-modules";

type TransactionQueryResult = {
  tt: string;
  a: string;
  q: string;
  fee: string;
  st: string;
  t: string;
  eid: number;
  sid: number;
};

export function* transactionsSaga(_action: TransactionsFetch) {
  try {
    const selectedAccount: UserAccount = yield select(selectUsingAccount);
    const mainAddress = selectedAccount.mainAddress;
    if (mainAddress) {
      const transactions = yield call(fetchTransactions, mainAddress, 3, 10);
      yield put(transactionsData(transactions));
    } else {
      yield put(
        notificationPush({
          message: {
            title: "No account selected",
            description: "Please select a trading account",
          },
          type: "ErrorAlert",
          time: new Date().getTime(),
        })
      );
    }
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

const fetchTransactions = async (
  address: string,
  monthsBefore: number,
  limit = 100000
): Promise<Transaction[]> => {
  const fromDate = subtractMonths(monthsBefore);
  const res: any = await sendQueryToAppSync(queries.listTransactionsByMainAccount, {
    main_account: address,
    from: fromDate.toISOString(),
    to: new Date().toISOString(),
    limit,
  });

  const txs: TransactionQueryResult[] = res.data.listTransactionsByMainAccount.items;
  const transactions: Transaction[] = txs.map((item) => ({
    amount: item.q,
    asset: item.a,
    event_id: item.eid,
    sid: item.sid,
    fee: item.fee,
    main_account: address,
    time: new Date(Number(item.t)).toISOString(),
    status: item.st as Transaction["status"],
    txn_type: item.tt as Transaction["txn_type"],
  }));
  return transactions;
};
