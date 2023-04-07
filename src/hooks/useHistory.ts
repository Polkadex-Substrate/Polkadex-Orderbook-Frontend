import { useState, useEffect, useMemo, ChangeEvent } from "react";
import { useDispatch } from "react-redux";

import { groupWithdrawsBySnapShotIds } from "../helpers/groupWithdrawsBySnapshotIds";

import { Transaction, transactionsFetch } from "@polkadex/orderbook-modules";
import { useWithdrawsProvider } from "../providers/user/withdrawsProvider/useWithdrawsProvider";
import { useTransactionsProvider } from "../providers/user/transactionsProvider/useTransactionProvider";
// to be deleted
export function useHistory() {
  const [filterBy, setFilterBy] = useState({
    type: "all",
    fieldValue: "",
  });
  const dispatch = useDispatch();
  const { transactions: transactionsHistory } = useTransactionsProvider();
  const { onFetchClaimWithdraw } = useWithdrawsProvider();
  useEffect(() => {
    dispatch(transactionsFetch());
  }, [dispatch]);
  const transactionHistory: Transaction[] = useMemo(() => {
    const transactionsBydate = transactionsHistory?.sort(
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
  }, [filterBy, transactionsHistory]);
  const withdrawalsList = transactionHistory.filter((txn) => txn.txn_type !== "DEPOSIT");
  const deposits = transactionHistory.filter((txn) => txn.txn_type === "DEPOSIT");

  const readyWithdrawals = useMemo(
    () => groupWithdrawsBySnapShotIds(withdrawalsList),
    [withdrawalsList]
  );

  const handleClaimWithdraws = (sid: number) => {
    onFetchClaimWithdraw({ sid });
  };

  useEffect(() => {
    dispatch(transactionsFetch());
  }, [dispatch]);

  return {
    filterByType: filterBy.type,
    onChangeFilterByType: (value: string) => setFilterBy({ ...filterBy, type: value }),
    search: filterBy.fieldValue,
    onChangeSearch: (e: ChangeEvent<HTMLInputElement>) =>
      setFilterBy({ ...filterBy, fieldValue: e.target.value }),
    transactionHistory,
    allWithdrawals: withdrawalsList,
    readyWithdrawals,
    deposits,
    handleClaimWithdraws,
  };
}
