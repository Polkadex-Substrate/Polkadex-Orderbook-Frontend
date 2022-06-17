export type ITransactionData = {
  id: string;
  date: Date;
  pair: string;
  coin: string;
  side: "buy" | "sell";
  price: number;
  fee: number;
  total: number;
  status: boolean;
};

export type ITransactions = {
  data?: ITransactionData[];
  remove?: (id: string) => void;
};
