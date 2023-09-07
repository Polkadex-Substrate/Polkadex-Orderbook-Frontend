import { AllHTMLAttributes } from "react";
import { Colors } from "@orderbook/core/helpers";

export type Props = {
  size?: string;
  color?: Colors;
} & Pick<AllHTMLAttributes<HTMLDivElement>, "style">;
