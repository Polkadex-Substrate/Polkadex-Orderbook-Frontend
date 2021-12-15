import { ReactNode, InputHTMLAttributes } from "react";

export type Props = {
  label?: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export type SecondaryInputProps = {
  label?: string;
  children?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;
