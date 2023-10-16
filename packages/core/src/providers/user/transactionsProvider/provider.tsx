import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import {
  groupWithdrawsBySnapShotIds,
  eventHandler,
} from "@orderbook/core/helpers";
import { QUERY_KEYS } from "@orderbook/core/constants";

import { useProfile } from "../profile";

import { Provider } from "./context";
import * as T from "./types";
import { DEPOSIT } from "./constants";
import { formatTransactionData, fetchTransactions } from "./helper";

export const TransactionsProvider: T.TransactionsComponent = ({ children }) => {
  const [filterBy, setFilterBy] = useState({
    type: "all",
    fieldValue: "",
  });

  const {
    selectedAccount: { mainAddress },
  } = useProfile();
  const { onHandleError } = useSettingsProvider();

  const {
    data: transactions,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: QUERY_KEYS.transactions(mainAddress),
    queryFn: async () => await onTransactionsFetch(mainAddress),
    enabled: Boolean(mainAddress?.length > 0),
    onError: onHandleError,
  });

  const onTransactionsFetch = async (mainAddress: string) => {
    if (mainAddress) {
      const transactions = await fetchTransactions(mainAddress, 3, 10);
      return transactions;
    }
    return [];
  };

  // const onTransactionsFetch1 = useCallback(
  //   async (mainAddress: string) => {
  //     try {
  //       dispatch(A.transactionsFetch());
  //       if (mainAddress) {
  //         const transactions = await fetchTransactions(mainAddress, 3, 10);
  //         dispatch(A.transactionsData(transactions));
  //       } else {
  //         onHandleError("No account selected, please select a trading account");
  //       }
  //     } catch (error) {
  //       onHandleError(`Could not fetch transaction history`);
  //     }
  //   },
  //   [onHandleError]
  // );

  const transactionHistory: T.Transaction[] = useMemo(() => {
    const transactionsBydate =
      transactions?.sort(
        (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
      ) ?? [];
    const txs = transactionsBydate?.reduce((pv: T.Transaction[], cv) => {
      if (
        cv.main_account &&
        cv.main_account
          .toLowerCase()
          .includes(filterBy.fieldValue.toLowerCase()) &&
        (filterBy.type === "" ||
          filterBy.type === cv.txn_type.toLowerCase() ||
          filterBy.type === "all")
      ) {
        pv.push(cv);
      }
      return pv;
    }, []);
    return txs;
  }, [filterBy, transactions]);

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

  const onTransactionsUpdate = useCallback(
    (payload: T.TransactionUpdatePayload) => {
      try {
        if (payload) {
          console.log("transactionsUpdateSaga", payload);
          const data = formatTransactionData(payload);
          // dispatch(A.transactionsUpdateEventData(data));
        }
      } catch (error) {
        onHandleError("Something has gone wrong while updating transactions");
      }
    },
    [onHandleError]
  );
  useEffect(() => {
    if (mainAddress) {
      const subscription = eventHandler({
        cb: onTransactionsUpdate,
        name: mainAddress,
        eventType: "SetTransaction",
      });
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [mainAddress, onTransactionsUpdate]);

  return (
    <Provider
      value={{
        loading: isLoading,
        success: isSuccess,
        transactions: transactions ?? [],

        filterByType: filterBy.type,
        onChangeFilterByType: (value: string) =>
          setFilterBy({ ...filterBy, type: value }),
        search: filterBy.fieldValue,
        onChangeSearch: (e: ChangeEvent<HTMLInputElement>) =>
          setFilterBy({ ...filterBy, fieldValue: e.target.value }),
        allWithdrawals: withdrawalsList,
        readyWithdrawals,
        deposits,
        onTransactionsUpdate,
      }}
    >
      {children}
    </Provider>
  );
};
