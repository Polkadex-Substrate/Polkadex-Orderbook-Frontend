import { ReactNode } from "react";

export type StyleProps = {
  active?: boolean;
};
export type FormType = "buy" | "sell";

export type OrderProps = {
  type: FormType;
  orderType: string | ReactNode;
  price: number | string;
  amount: number | string;
  available: number;
};
