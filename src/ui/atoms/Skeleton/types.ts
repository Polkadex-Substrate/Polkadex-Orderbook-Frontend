import { HTMLAttributes } from "react";

export type Props = {
  width?: string;
  height?: string;
} & HTMLAttributes<HTMLDivElement>;
