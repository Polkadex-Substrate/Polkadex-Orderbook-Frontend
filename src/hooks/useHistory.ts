import { useState, useEffect, useMemo, ChangeEvent, useCallback } from "react";
import { useDispatch } from "react-redux";

import { groupWithdrawsBySnapShotIds } from "../helpers/groupWithdrawsBySnapshotIds";

import { selectGetAsset } from "@polkadex/orderbook/modules/public/assets";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import {
  selectHasCurrentTradeAccount,
  selectTransactions,
  selectTransactionDepositData,
  Transaction,
  transactionsFetch,
  withdrawsClaimFetch,
} from "@polkadex/orderbook-modules";

export function useHistory() {
  const [filterBy, setFilterBy] = useState({
    type: "all",
    fieldValue: "",
  });

  const dispatch = useDispatch();
  const getAsset = useReduxSelector(selectGetAsset);
  const transactionsHistory = useReduxSelector(selectTransactions);

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
  const withdrawalsList = transactionHistory.filter((txn) => txn.txn_type === "WITHDRAW");
  const deposits = transactionHistory.filter((txn) => txn.txn_type === "DEPOSIT");

  const withdrawals = useMemo(
    () => groupWithdrawsBySnapShotIds(withdrawalsList),
    [withdrawalsList]
  );

  const handleClaimWithdraws = (sid: number) => {
    dispatch(withdrawsClaimFetch({ sid }));
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
    withdrawals,
    deposits,
    handleClaimWithdraws,
  };
}
