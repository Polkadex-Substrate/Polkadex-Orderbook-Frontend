import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import {
  groupWithdrawsBySnapShotIds,
  eventHandler,
} from "@orderbook/core/helpers";

import { useProfile } from "../profile";

import * as A from "./actions";
import { Provider } from "./context";
import { initialState, transactionsReducer } from "./reducer";
import * as T from "./types";
import { DEPOSIT } from "./constants";
import { formatTransactionData, fetchTransactions } from "./helper";

export const TransactionsProvider: T.TransactionsComponent = ({ children }) => {
  const [state, dispatch] = useReducer(transactionsReducer, initialState);
  const [filterBy, setFilterBy] = useState({
    type: "all",
    fieldValue: "",
  });

  const {
    selectedAccount: { mainAddress },
  } = useProfile();
  const { onHandleError } = useSettingsProvider();

  const onTransactionsFetch = useCallback(
    async (mainAddress: string) => {
      try {
        dispatch(A.transactionsFetch());
        if (mainAddress) {
          const transactions = await fetchTransactions(mainAddress, 3, 10);
          dispatch(A.transactionsData(transactions));
        } else {
          onHandleError("No account selected, please select a trading account");
        }
      } catch (error) {
        onHandleError(`Could not fetch transaction history`);
      }
    },
    [onHandleError]
  );

  const transactionHistory: T.Transaction[] = useMemo(() => {
    const transactionsBydate = state.transactions?.sort(
      (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
    );
    const transactions = transactionsBydate?.reduce(
      (pv: T.Transaction[], cv) => {
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
      },
      []
    );
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
      if (mainAddress) {
        onTransactionsFetch(mainAddress);
      }
    } catch (error) {
      onHandleError(`Transactions error: ${error?.message ?? error}`);
    }
  }, [mainAddress, onTransactionsFetch, onHandleError]);

  const onTransactionsUpdate = useCallback(
    (payload: T.TransactionUpdatePayload) => {
      try {
        if (payload) {
          console.log("transactionsUpdateSaga", payload);
          const data = formatTransactionData(payload);
          dispatch(A.transactionsUpdateEventData(data));
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
        ...state,
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
