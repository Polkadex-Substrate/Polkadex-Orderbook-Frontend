import { ReactNode } from "react";

export type Props = {
  title: ReactNode | string;
  children: ReactNode;
  direction?: "left" | "right" | "bottom" | "top" | "bottomRight";
  isOpacity?: boolean;
};

export type StyleProps = {
  isOpen?: boolean;
};
