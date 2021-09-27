import { InputHTMLAttributes } from "react";
export type Props = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

export type MnemonicProps = {
  label: string;
  onChange: () => void;
} & InputHTMLAttributes<HTMLInputElement>;

export type MnemonicExportProps = {
  label: string;
  onChange: () => void;
  phrases?: string[];
};
