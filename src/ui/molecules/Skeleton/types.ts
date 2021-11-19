import { HTMLAttributes } from "react";

export type Props = {
  width?: string;
  height?: string;
  isLight?: boolean;
} & HTMLAttributes<HTMLDivElement>;
