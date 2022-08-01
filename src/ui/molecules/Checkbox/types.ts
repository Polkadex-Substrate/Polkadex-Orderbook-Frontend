import { InputHTMLAttributes, ReactNode } from "react";
import { AriaCheckboxProps } from "react-aria";

import { Colors, Sizes } from "@polkadex/web-helpers";

export type Props = {
  children?: ReactNode;
  fill?: Colors;
  color?: Colors;
  checboxSize?: Sizes;
  backgroundStyle?: "flat" | "ghost" | "outline" | "none";
  borderStyle?: "rounded" | "squared" | "semiRounded";
} & Omit<InputHTMLAttributes<HTMLInputElement>, keyof AriaCheckboxProps> &
  AriaCheckboxProps;
