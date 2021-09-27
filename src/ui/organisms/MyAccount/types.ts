import { ReactNode } from "react";

export type Props = {
  children?: ReactNode;
  isHeader?: boolean;
  balance: string;
  address: string;
  accountName: string;
};
