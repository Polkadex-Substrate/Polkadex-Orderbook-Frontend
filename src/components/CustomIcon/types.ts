import { IColors, IIcons, ISizes, ITokens } from "src/utils/types";

export type Props = {
  icon: IIcons | string;
  size?: ISizes;
  isActive?: boolean;
  background?: IColors;
  hoverable?: boolean;
};

export type ITokenProps = {
  icon: ITokens;
  size?: ISizes;
  background?: IColors;
};
