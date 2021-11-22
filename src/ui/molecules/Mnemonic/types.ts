import { InputHTMLAttributes } from "react";

export type MnemonicProps = {
  label: string;
  handleChange: () => void;
} & InputHTMLAttributes<HTMLInputElement>;

export type MnemonicExportProps = {
  label: string;
  phrases?: string[];
};

export type MnemonicSelectProps = {
  handleExport: () => void;
  handleImport: () => void;
};
