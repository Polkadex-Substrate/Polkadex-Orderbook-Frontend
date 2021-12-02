import { ReactNode } from "react";

import { OrderStatus, OrderType } from "public/charting_library/charting_library.min";

export type Props = {
  date?: string;
  baseUnit?: string;
  quoteUnit?: string;
  side?: string | ReactNode;
  isSell?: boolean;
  price?: string | ReactNode;
  amount?: string | ReactNode;
  total?: string | ReactNode;
  filled?: string;
  type?: OrderType;
  executed?: string | ReactNode;
  transactionType?: OrderStatus;
};
