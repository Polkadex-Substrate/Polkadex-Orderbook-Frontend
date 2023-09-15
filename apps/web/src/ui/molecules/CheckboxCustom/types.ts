import { InputHTMLAttributes, ReactNode } from "react";
import { Colors, Sizes } from "@orderbook/core/helpers";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  children?: ReactNode;
  fill?: Colors;
  color?: Colors;
  checboxSize?: Sizes;
  backgroundStyle?: "flat" | "ghost" | "outline" | "none";
  borderStyle?: "rounded" | "squared" | "semiRounded";
}
