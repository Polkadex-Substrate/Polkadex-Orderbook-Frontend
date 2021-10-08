import { ButtonHTMLAttributes } from "react";

import * as Icon from "src/ui/atoms/Icon/types";
import { IColors } from "src/utils/types";

type Props = {
  title: string;
  size?: "xSmall" | "small" | "medium" | "large";
  icon?: Icon.Props;
  token?: Icon.ITokenProps;
  isActive?: boolean;
  background?: IColors;
  as?: "button" | "div" | "a";
  isFull?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default Props;
