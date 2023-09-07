import { ReactNode } from "react";
import { Colors } from "@orderbook/core/helpers";

export type Props = {
  message: string;
  color?: Colors;
  children: ReactNode;
  isVisible?: boolean;
  isPriority?: boolean;
};
