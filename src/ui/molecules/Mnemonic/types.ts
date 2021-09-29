import { InputHTMLAttributes } from "react";

export type MnemonicProps = {
  label: string;
  handleChange: () => void;
} & InputHTMLAttributes<HTMLInputElement>;

export type MnemonicExportProps = {
  label: string;
  handleChange: () => void;
  phrases?: string[];
};

export type MnemonicSelectProps = {
  handleExport: () => void;
  handleImport: () => void;
};
