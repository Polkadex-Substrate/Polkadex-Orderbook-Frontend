import { useState, useEffect, useMemo, ChangeEvent } from "react";
import { useDispatch } from "react-redux";

import { selectGetAsset } from "@polkadex/orderbook/modules/public/assets";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import {
  selectHasCurrentTradeAccount,
  selectTransactions,
  selectTransactionDepositData,
  Transaction,
  transactionsFetch,
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
  console.log({ transactionHistory });
  const withdrawalsList = transactionHistory.filter((txn) => txn.txn_type === "WITHDRAW");
  const deposits = transactionHistory.filter((txn) => txn.txn_type === "DEPOSIT");

  const withdrawals = groupWithdrawsByEventIds(withdrawalsList);

  const handleClaimWithdraws = () => {
    // do your thing here
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

export type WithdrawGroup = {
  id: number;
  eventId: number;
  items: WithdrawGroupItem[];
};

export type WithdrawGroupItem = {
  id: number;
  asset: string;
  date: string;
  amount: string;
};

// use event_id from withdraw list as block and index as id for withdraw item and data
const groupWithdrawsByEventIds = (withdrawalsList: Transaction[]): WithdrawGroup[] => {
  const withdrawals: WithdrawGroup[] = [];

  withdrawalsList.forEach((withdrawal, index) => {
    const id = index;
    const eventId = withdrawal.event_id;
    const items: WithdrawGroupItem[] = [];

    withdrawalsList.forEach((item) => {
      if (item.event_id === eventId) {
        items.push({
          id,
          asset: item.asset,
          date: item.time,
          amount: item.amount,
        });
      }
    });
    withdrawals.push({ id, eventId, items });
  });
  return withdrawals;
};
