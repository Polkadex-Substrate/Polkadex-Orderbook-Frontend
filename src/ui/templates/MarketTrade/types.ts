import { ReactNode } from "react";

export type Props = {
  time?: string | ReactNode;
  amount?: string | number | ReactNode;
  price?: string | number | ReactNode;
  isSell?: boolean;
  onClick?: () => void;
};
