import { ReactNode, AllHTMLAttributes, StyleHTMLAttributes } from "react";

export type Props = {
  title: ReactNode | string;
  children: ReactNode;
  direction?: "left" | "right" | "bottom" | "top" | "bottomRight" | "bottomLeft";
  isOpacity?: boolean;
} & Pick<StyleHTMLAttributes<HTMLStyleElement>, "style">;

export type StyleProps = {
  isOpen?: boolean;
};
