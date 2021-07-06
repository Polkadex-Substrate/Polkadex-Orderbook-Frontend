import { ButtonHTMLAttributes } from "react";
import * as IIcons from "src/components/CustomIcon/types";
import { IColors } from "src/utils/types";

type Props = {
  title: string;
  size?: "small" | "medium" | "large";
  icon?: IIcons.Props;
  token?: IIcons.ITokenProps;
  isActive?: boolean;
  background?: IColors;
  as?: "button" | "div" | "a";
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default Props;
