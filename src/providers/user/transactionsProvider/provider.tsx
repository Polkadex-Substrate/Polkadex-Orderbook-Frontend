import { useEffect, useReducer } from "react";

import * as A from "./actions";
import { Provider } from "./context";
import { initialState, transactionsReducer } from "./reducer";
import * as T from "./types";
import { fetchAllFromAppSync, sendQueryToAppSync } from "@polkadex/orderbook/helpers/appsync";
import { useProfile } from "../profile/useProfile";
import { UserAccount } from "../profile/types";
import { subtractMonthsFromDateOrNow } from "@polkadex/orderbook/helpers/DateTime";
import * as queries from "../../../graphql/queries";

export const TransactionsProvider: T.TransactionsComponent = ({
  onError,
  onNotification,
  children,
}) => {
  const [state, dispatch] = useReducer(transactionsReducer, initialState);
  const profileState = useProfile();

  const onTransactionsFetch = async () => {
    try {
      const selectedAccount: UserAccount = profileState.selectedAccount;
      const mainAddress = selectedAccount.mainAddress;
      if (mainAddress) {
        const transactions = await fetchTransactions(mainAddress, 3, 10);
        dispatch(A.transactionsData(transactions));
      } else {
        onNotification("No account selected, Please select a trading account");
      }
    } catch (error) {
      console.error(error);
      onError("Sonething has gone wrong in fetching transactions");
    }
  };

  const fetchTransactions = async (
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
    const transactions: T.Transaction[] = txs.map((item) => ({
      amount: item.q,
      asset: item.a,
      event_id: item.eid,
      sid: item.sid,
      fee: item.fee,
      main_account: address,
      time: new Date(Number(item.t)).toISOString(),
      status: item.st as T.Transaction["status"],
      txn_type: item.tt as T.Transaction["txn_type"],
    }));
    return transactions;
  };

  useEffect(() => {
    onTransactionsFetch();
  }, []);

  return (
    <Provider
      value={{
        ...state,
      }}>
      {children}
    </Provider>
  );
};
