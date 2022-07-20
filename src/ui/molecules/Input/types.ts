import { ReactNode, InputHTMLAttributes } from "react";

export type Props = {
  label?: string | JSX.Element;
  error?: string;
  children?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

export type SecondaryInputProps = {
  label?: string;
  children?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;
