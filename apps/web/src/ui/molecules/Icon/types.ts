import { HTMLAttributes } from "react";
import { Colors, Icons, Sizes, TokensTicker } from "@orderbook/core/helpers";

export type Props = {
  name: Icons | TokensTicker;
  isActive?: boolean;
  size?: Sizes;
  isToken?: boolean;
  background?: Colors;
  color?: Colors;
  stroke?: Colors;
  fill?: Colors;
} & HTMLAttributes<HTMLDivElement>;
