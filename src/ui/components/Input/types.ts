import { HTMLAttributes, InputHTMLAttributes } from "react";

import { Props as IconProps } from "src/ui/atoms/Icon/types";
import { IColors } from "src/utils/types";

export type Props = {
  error?: string;
  onInputChange?: (e: string) => void;
  initialValue?: string;
  disabled?: boolean;
  label?: string;
  name?: string;
  icon?: IconProps;
  background?: IColors;
  WrapperStyle?: HTMLAttributes<HTMLDivElement>;
} & InputHTMLAttributes<HTMLInputElement>;

export type OrderInputProps = {
  isBuy?: boolean;
} & Pick<Props, "background">;
