import { ReactNode, HTMLAttributes } from "react";

export type Props = {
  header?: ReactNode | string;
  children?: ReactNode | string;
  isOpacity?: boolean;
  isFull?: boolean;
  direction?:
    | "left"
    | "right"
    | "bottom"
    | "bottomRight"
    | "top"
    | "topRight"
    | "centerLeft"
    | "centerRight";
  priority?: "low" | "medium" | "high";
} & HTMLAttributes<HTMLDivElement>;
