import { HTMLAttributes, ReactChild, ReactNode } from "react";

export type Props = {
  title: ReactNode | string | ReactChild;
  children: ReactNode 
  direction?: "left" | "right" | "bottom" | "top";
  isOpacity?: boolean;
} & Omit<HTMLAttributes<HTMLDivElement>, 'title'>;

export type StyleProps = {
  isOpen?: boolean;
};
