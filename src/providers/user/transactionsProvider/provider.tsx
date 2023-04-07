import { ChangeEvent, useCallback, useEffect, useMemo, useReducer, useState } from "react";

import { useProfile } from "../profile/useProfile";
import { UserAccount } from "../profile/types";
import * as queries from "../../../graphql/queries";

import * as A from "./actions";
import { Provider } from "./context";
import { initialState, transactionsReducer } from "./reducer";
import * as T from "./types";
import { DEPOSIT } from "./constants";

import { fetchAllFromAppSync } from "@polkadex/orderbook/helpers/appsync";
import { subtractMonthsFromDateOrNow } from "@polkadex/orderbook/helpers/DateTime";
import { groupWithdrawsBySnapShotIds } from "@polkadex/orderbook/helpers/groupWithdrawsBySnapshotIds";

export const TransactionsProvider: T.TransactionsComponent = ({
  onError,
  onNotification,
  children,
}) => {
  const [state, dispatch] = useReducer(transactionsReducer, initialState);
  const [filterBy, setFilterBy] = useState({
    type: "all",
    fieldValue: "",
  });

  const profileState = useProfile();

  const onTransactionsFetch = useCallback(async (mainAddress: string) => {
    dispatch(A.transactionsFetch());
    if (mainAddress) {
      const transactions = await fetchTransactions(mainAddress, 3, 10);
      dispatch(A.transactionsData(transactions));
    } else {
      onNotification("No account selected, Please select a trading account");
    }
  }, [profileState.selectedAccount, onNotification]);

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

    return txs?.map((item) => ({
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
  };

  const transactionHistory: T.Transaction[] = useMemo(() => {
    const transactionsBydate = state.transactions?.sort(
      (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
    );
    const transactions = transactionsBydate?.reduce((pv, cv) => {
      if (
        cv.main_account.toLowerCase().includes(filterBy.fieldValue.toLowerCase()) &&
        (filterBy.type === "" ||
          filterBy.type === cv.txn_type.toLowerCase() ||
          filterBy.type === "all")
      ) {
        pv.push(cv);
      }
      return pv;
    }, []);
    return transactions;
  }, [filterBy, state.transactions]);

  const withdrawalsList = useMemo(
    () => transactionHistory?.filter((txn) => txn.txn_type !== DEPOSIT),
    [transactionHistory]
  );

  const deposits = useMemo(
    () => transactionHistory?.filter((txn) => txn.txn_type === DEPOSIT),
    [transactionHistory]
  );

  const readyWithdrawals = useMemo(
    () => groupWithdrawsBySnapShotIds(withdrawalsList),
    [withdrawalsList]
  );



  useEffect(() => {
    try {
      if (profileState?.selectedAccount?.mainAddress) {
        onTransactionsFetch(profileState.selectedAccount.mainAddress);
      }
    } catch (error) {
      onError("error while fetching transaction");
    }
  }, [onError, profileState?.selectedAccount?.mainAddress, onTransactionsFetch]);

  return (
    <Provider
      value={{
        ...state,
        filterByType: filterBy.type,
        onChangeFilterByType: (value: string) => setFilterBy({ ...filterBy, type: value }),
        search: filterBy.fieldValue,
        onChangeSearch: (e: ChangeEvent<HTMLInputElement>) =>
          setFilterBy({ ...filterBy, fieldValue: e.target.value }),
        allWithdrawals: withdrawalsList,
        readyWithdrawals,
        deposits,
      }}>
      {children}
    </Provider>
  );
};
