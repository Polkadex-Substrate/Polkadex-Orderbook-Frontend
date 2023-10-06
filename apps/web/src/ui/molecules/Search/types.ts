import { InputHTMLAttributes } from "react";

export type Props = {
  isFull?: boolean;
  hasBorder?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;
