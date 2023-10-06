import { AllHTMLAttributes, ReactNode } from "react";
import { Colors, Positions } from "@orderbook/core/helpers";

export type Props = {
  children: ReactNode;
  position?: Positions;
};

export type TooltipHeaderProps = {
  as?: "button" | "div" | "span";
  children?: ReactNode;
} & AllHTMLAttributes<HTMLDivElement>;

export type TooltipContentProps = {
  position?: Positions;
  children?: ReactNode;
  minWidth?: string | "max-content" | "fit-content" | "100%";
  background?: Colors;
  onDisplay?: () => void;
  onDismiss?: () => void;
  priority?: "low" | "high";
} & AllHTMLAttributes<HTMLDivElement>;
