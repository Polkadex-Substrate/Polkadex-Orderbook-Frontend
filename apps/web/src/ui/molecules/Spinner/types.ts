import { AllHTMLAttributes } from "react";
import { Colors } from "@orderbook/core/helpers";

export type Props = {
  size?: string;
  color?: Colors;
  loading?: boolean;
} & Pick<AllHTMLAttributes<HTMLDivElement>, "style">;
