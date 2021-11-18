import { HTMLAttributes } from "react";

import { IColors, IIcons, ISizes, ITokens } from "src/utils/types";

export type Props = {
  icon: IIcons;
  size?: ISizes;
  isActive?: boolean;
  background?: IColors | string;
  hoverable?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export type ITokenProps = {
  icon: ITokens;
  size?: ISizes;
  background?: IColors;
} & HTMLAttributes<HTMLDivElement>;
