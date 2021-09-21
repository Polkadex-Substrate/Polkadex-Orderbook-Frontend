import { InputHTMLAttributes } from "react";

export type Props = {
  label?: string;
  token?: string;
} & InputHTMLAttributes<HTMLInputElement>;
