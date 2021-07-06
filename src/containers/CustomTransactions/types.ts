import { ReactNode } from "react";

export type Props = {
  active?: boolean;
};

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
};

export type CardProps = {
  date?: string  
  baseUnit?: string
  quoteUnit?:string
  side?: string | ReactNode
  isSell?: boolean
  price?: string | ReactNode
  amount?:string | ReactNode
  total?: string | ReactNode
  filled?: string | ReactNode
  type?: 'Limit' | 'Market'
  cancel?: () => void
}