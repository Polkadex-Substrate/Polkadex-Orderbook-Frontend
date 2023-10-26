import * as queries from "@orderbook/core/graphql/queries";
import {
  fetchAllFromAppSync,
  subtractMonthsFromDateOrNow,
} from "@orderbook/core/helpers";

import * as T from "./types";

export const fetchTransactions = async (
  address: string,
  monthsBefore: number,
  limit = 100000
): Promise<T.Transaction[]> => {
  const fromDate = subtractMonthsFromDateOrNow(monthsBefore);
  const txs: T.TransactionQueryResult[] = await fetchAllFromAppSync(
    queries.listTransactionsByMainAccount,
    {
      main_account: address,
      from: fromDate.toISOString(),
      to: new Date().toISOString(),
      limit,
    },
    "listTransactionsByMainAccount"
  );

  return txs?.map((item) => ({
    amount: item.q,
    asset: item.a,
    stid: item.stid,
    snapshot_id: item.snapshot_id ?? 0,
    fee: item.fee,
    main_account: address,
    time: new Date(Number(item.t)).toISOString(),
    status: item.st as T.Transaction["status"],
    txn_type: item.tt as T.Transaction["txn_type"],
    isReverted: item.isReverted,
  }));
};

export const formatTransactionData = (
  data: T.TransactionUpdatePayload
): T.Transaction => {
  if (data.txn_type === "DEPOSIT") {
    return {
      ...data,
      stid: Number(data.stid),
      main_account: data.user,
      fee: data.fee.toString(),
      amount: data.amount.toString(),
      asset: data.asset,
      time: new Date().toISOString(),
      isReverted: data.isReverted,
    };
  } else {
    return {
      stid: Number(data.stid),
      status: data.status,
      snapshot_id: Number(data?.snapshot_id) || 0,
      txn_type: "WITHDRAWAL",
      main_account: data.user,
      fee: data.fee.toString(),
      amount: data.amount.toString(),
      asset: data.asset,
      time: new Date().toISOString(),
      isReverted: data.isReverted,
    };
  }
};
