import { Transaction, Asset } from "@orderbook/core/utils/orderbookService";

export type WithdrawGroup = {
  id: number;
  sid: number;
  items: WithdrawGroupItem[];
};

export type WithdrawGroupItem = {
  id: number;
  asset: Asset;
  time: string | Date;
  stid: number;
  amount: string;
  status: string;
};

// use event_id from withdraw list as block and index as id for withdraw item and data
export const groupWithdrawsBySnapShotIds = (
  withdrawalsList: Transaction[]
): WithdrawGroup[] => {
  const readyWithdrawals = withdrawalsList.filter(
    (txn) => txn.status === "READY"
  );
  const withdrawals: WithdrawGroup[] = [];
  const sidsProcessed: Set<number> = new Set();

  readyWithdrawals.forEach((withdrawal, index) => {
    const id = index;
    const snapshotId = Number(withdrawal.snapshot_id);
    const items: WithdrawGroupItem[] = [];
    if (sidsProcessed.has(snapshotId)) return;
    readyWithdrawals.forEach((item) => {
      if (Number(item.snapshot_id) === snapshotId) {
        items.push({
          id,
          stid: item.stid,
          asset: item.asset,
          time: new Date(item.timestamp),
          amount: String(item.amount),
          status: String(item.status),
        });
      }
    });
    sidsProcessed.add(snapshotId);
    withdrawals.push({ id, sid: snapshotId, items });
  });
  return withdrawals;
};
