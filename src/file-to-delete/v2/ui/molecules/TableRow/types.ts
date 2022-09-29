import { ReactNode } from "react";

export type Props = {
  isOpenOrder?: boolean;
  header?: string[];
  children?: ReactNode;
};

export type CardProps = {
  isOpenOrder?: boolean;
  isSell: boolean;
  filledQuantity?: number;
  orderSide: string;
  baseUnit: string;
  quoteUnit: string;
  data?: Info[];
};

type Info = {
  value: string | number;
  title?: string;
};

export type Header = {
  data?: string[];
};
