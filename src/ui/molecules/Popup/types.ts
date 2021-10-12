import { ReactNode } from "react";

export type Props = {
  isVisible: boolean;
  onClose: () => void;
  children: ReactNode;
  BottomPosition?: boolean;
  isMessage?: boolean;
  size?: "xxSmall" | "xSmall" | "small" | "medium" | "large" | "full";
};
