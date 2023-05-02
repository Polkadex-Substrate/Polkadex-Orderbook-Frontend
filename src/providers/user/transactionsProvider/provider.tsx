import { ChangeEvent, useCallback, useEffect, useMemo, useReducer, useState } from "react";

import { useProfile } from "../profile/useProfile";
import * as queries from "../../../graphql/queries";

import * as A from "./actions";
import { Provider } from "./context";
import { initialState, transactionsReducer } from "./reducer";
import * as T from "./types";
import { DEPOSIT } from "./constants";

import { fetchAllFromAppSync } from "@polkadex/orderbook/helpers/appsync";
import { subtractMonthsFromDateOrNow } from "@polkadex/orderbook/helpers/DateTime";
import { groupWithdrawsBySnapShotIds } from "@polkadex/orderbook/helpers/groupWithdrawsBySnapshotIds";
import { useSettingsProvider } from "@polkadex/orderbook/providers/public/settings";

export const TransactionsProvider: T.TransactionsComponent = ({ children }) => {
  const [state, dispatch] = useReducer(transactionsReducer, initialState);
  const [filterBy, setFilterBy] = useState({
    type: "all",
    fieldValue: "",
  });

  const profileState = useProfile();
  const settingsState = useSettingsProvider();

  const onTransactionsFetch = useCallback(
    async (mainAddress: string) => {
      dispatch(A.transactionsFetch());
      if (mainAddress) {
        const transactions = await fetchTransactions(mainAddress, 3, 10);
        dispatch(A.transactionsData(transactions));
      } else {
        settingsState.onHandleError("No account selected, please select a trading account");
      }
    },
    [settingsState]
  );

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
      settingsState.onHandleError(`Transactions error: ${error?.message ?? error}`);
    }
  }, [profileState?.selectedAccount?.mainAddress, onTransactionsFetch, settingsState]);

  const formatTransactionData = (data: T.TransactionUpdatePayload): T.Transaction => {
    if (data.txn_type === "DEPOSIT") {
      return {
        ...data,
        stid: Number(data.stid),
        main_account: data.user,
        fee: data.fee.toString(),
        amount: data.amount.toString(),
        asset: data.asset.asset,
        time: new Date().toISOString(),
      };
    } else {
      return {
        stid: Number(data.stid),
        status: data.status,
        sid: Number(data.sid) ?? 0,
        txn_type: "WITHDRAWAL",
        main_account: data.user,
        fee: data.fee.toString(),
        amount: data.amount.toString(),
        asset: data.asset.asset,
        time: new Date().toISOString(),
      };
    }
  };

  const onTransactionsUpdate = useCallback(
    (payload: T.TransactionUpdatePayload) => {
      try {
        if (payload) {
          console.log("transactionsUpdateSaga", payload);
          const data = formatTransactionData(payload);
          dispatch(A.transactionsUpdateEventData(data));
        }
      } catch (error) {
        settingsState.onHandleError("Something has gone wrong while updating transactions");
      }
    },
    [settingsState]
  );

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
        onTransactionsUpdate,
      }}>
      {children}
    </Provider>
  );
};
