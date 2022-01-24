import { ReactNode } from "react";

import { Colors } from "@polkadex/web-helpers";

export type Props = {
  title: string;
  description?: string;
  isHorizontal?: boolean;
  textColor?: Colors;
  children?: ReactNode;
};
