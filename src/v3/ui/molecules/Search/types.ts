import { InputHTMLAttributes } from "react";

export type Props = {
  isFull?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;
