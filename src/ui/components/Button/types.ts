import { ButtonHTMLAttributes } from "react";

import * as IIcons from "src/ui/components/Icon/types";
import { IColors } from "src/utils/types";

type Props = {
  title: string;
  size?: "Small" | "Medium" | "Large";
  icon?: IIcons.Props;
  token?: IIcons.ITokenProps;
  isActive?: boolean;
  background?: IColors;
  as?: "button" | "div" | "a";
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default Props;
