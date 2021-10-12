import { InputHTMLAttributes } from "react";
export type Props = {
  label?: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;
