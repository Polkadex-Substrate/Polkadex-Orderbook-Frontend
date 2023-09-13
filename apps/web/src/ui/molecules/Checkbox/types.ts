import { InputHTMLAttributes, LabelHTMLAttributes, ReactNode } from "react";
import { AriaCheckboxProps } from "react-aria";
import { Colors, Sizes } from "@orderbook/core/helpers";

export type Props = {
  children?: ReactNode;
  fill?: Colors;
  color?: Colors;
  checboxSize?: Sizes;
  backgroundStyle?: "flat" | "ghost" | "outline" | "none";
  borderStyle?: "rounded" | "squared" | "semiRounded";
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
} & Omit<InputHTMLAttributes<HTMLInputElement>, keyof AriaCheckboxProps> &
  AriaCheckboxProps;
