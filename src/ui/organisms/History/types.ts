export type HistoryProps = {
  date?: string;
  address: string;
  txid: string;
  amount: string;
  amountInFiat?: string;
  isDeposit?: boolean;
};
