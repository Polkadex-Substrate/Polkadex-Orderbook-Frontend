import { AllHTMLAttributes } from "react";

import { Colors } from "@polkadex/web-helpers";

export type Props = {
  size?: string;
  color?: Colors;
} & Pick<AllHTMLAttributes<HTMLDivElement>, "style">;
