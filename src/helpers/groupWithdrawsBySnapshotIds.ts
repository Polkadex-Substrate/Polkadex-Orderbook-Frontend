import { Transaction } from "@polkadex/orderbook-modules";

export type WithdrawGroup = {
  id: number;
  sid: number;
  items: WithdrawGroupItem[];
};

export type WithdrawGroupItem = {
  id: number;
  asset: string;
  date: string;
  event_id: number;
  amount: string;
  status: string;
};

// use event_id from withdraw list as block and index as id for withdraw item and data
export const groupWithdrawsBySnapShotIds = (
  withdrawalsList: Transaction[]
): WithdrawGroup[] => {
  const withdrawals: WithdrawGroup[] = [];
  const sidsProcessed: Set<number> = new Set();

  withdrawalsList.forEach((withdrawal, index) => {
    const id = index;
    const sid = Number(withdrawal.sid);
    const items: WithdrawGroupItem[] = [];
    if (sidsProcessed.has(sid)) return;
    withdrawalsList.forEach((item) => {
      if (Number(item.sid) === sid) {
        items.push({
          id,
          event_id: item.event_id,
          asset: item.asset,
          date: new Date(item.time).toLocaleString(),
          amount: item.amount,
          status: item.status,
        });
      }
    });
    sidsProcessed.add(sid);
    withdrawals.push({ id, sid: sid, items });
  });
  return withdrawals;
};
