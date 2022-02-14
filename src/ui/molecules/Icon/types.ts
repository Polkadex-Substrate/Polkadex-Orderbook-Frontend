import { HTMLAttributes } from "react";

import { Colors, Icons, Sizes, TokensTicker } from "../../../helpers";

export type Props = {
  name: Icons | TokensTicker;
  isActive?: boolean;
  size?: Sizes;
  isToken?: boolean;
  background?: Colors;
  color?: Colors;
  stroke?: Colors;
} & HTMLAttributes<HTMLDivElement>;
