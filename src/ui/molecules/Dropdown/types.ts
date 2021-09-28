import { ReactNode, StyleHTMLAttributes } from "react";

export type Props = {
  title: ReactNode | string;
  children: ReactNode;
  direction?: "left" | "right" | "bottom" | "top" | "bottomRight" | "bottomLeft";
  isOpacity?: boolean;
  variant?: 1 | 2 | 3;
} & Pick<StyleHTMLAttributes<HTMLStyleElement>, "style">;
