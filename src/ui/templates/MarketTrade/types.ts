import { AnchorHTMLAttributes, ReactNode } from "react";
import { IIcons } from "src/utils/types";

export type Props = {
  time?: string | ReactNode
  amount?: string | number | ReactNode
  price?: string | number  | ReactNode
  isSell?: boolean
  onClick?: () => void
};
