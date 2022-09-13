import { Colors } from "@polkadex/web-helpers";

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
