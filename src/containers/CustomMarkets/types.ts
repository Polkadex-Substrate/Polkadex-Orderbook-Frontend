import { HTMLAttributes } from "react";
import { ITokens } from "src/utils/types";

export type Props = {
  pair?: string;
  vol?: string | number;
  priceFiat?: string | number;
  price?: string | number;
  change?: string | number;
  tokenIcon?: ITokens | undefined;
  key?: number | string
  onClick?: () => void
} 
