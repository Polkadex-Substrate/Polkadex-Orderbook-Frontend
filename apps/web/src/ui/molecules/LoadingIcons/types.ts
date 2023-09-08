import { Colors } from "@orderbook/core/helpers";

export type Props = {
  size?:
    | "giant"
    | "extraLarge"
    | "large"
    | "extraMedium"
    | "medium"
    | "extraSmall"
    | "small"
    | "mini";
  color?: Colors;
};
