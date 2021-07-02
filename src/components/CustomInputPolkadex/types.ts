import { HTMLAttributes, InputHTMLAttributes, ReactNode } from "react";
import { Props as IconProps } from "src/components/CustomIcon/types";
import { IColors } from "src/utils/types";

export type Props = {
  error?: string;
  value?: string | number;
  disabled?: boolean;
  label?: string;
  name?: string;
  icon?: IconProps;
  background?: IColors;
  action?: () => void;
  WrapperStyle?: HTMLAttributes<HTMLDivElement>;
} & InputHTMLAttributes<HTMLInputElement>;


export type OrderInputProps = {
  isBuy?: boolean;
  amount?: string | number;
  token?: string;
  children?: ReactNode;
  label?: string;
  reset?: () => void | null
} & Partial<Props> ;

export type AmountInputProps = {
  from?: string | number | ReactNode
  to?: string | number | ReactNode
  amount?: string | number | ReactNode
  orderType?: string | number
} & Partial<Props> ;
