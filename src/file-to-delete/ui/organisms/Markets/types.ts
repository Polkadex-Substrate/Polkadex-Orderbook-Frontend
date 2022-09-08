import { HTMLAttributes } from "react";

import { TokensTicker } from "@polkadex/web-helpers";

export type Props = {
  pair?: string;
  vol?: string | number;
  priceFiat?: string | number;
  price?: string | number;
  change?: string | number;
  tokenIcon?: TokensTicker | undefined;
} & Pick<HTMLAttributes<HTMLDivElement>, "onClick">;
