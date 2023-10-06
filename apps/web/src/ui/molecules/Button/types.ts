import { ReactNode, ButtonHTMLAttributes } from "react";
import { Colors, Sizes } from "@orderbook/core/helpers";

import * as IconProps from "../Icon/types";

export type Props = {
  children?: ReactNode;
  background?: Colors;
  color?: Colors;
  icon?: IconProps.Props;
  isFull?: boolean;
  size?: Sizes;
  hoverColor?: Colors;
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;
