import { InputHTMLAttributes } from "react";
export type Props = {
  label: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export type MnemonicProps = {
  label: string;
  handleChange: () => void;
} & InputHTMLAttributes<HTMLInputElement>;

export type MnemonicExportProps = {
  label: string;
  handleChange: () => void;
  phrases?: string[];
};
