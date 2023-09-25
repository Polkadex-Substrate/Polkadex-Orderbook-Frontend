import { InputHTMLAttributes } from "react";

export type MnemonicProps = {
  label: string;
  state: State;
  handleChange: (values: State) => void;
} & InputHTMLAttributes<HTMLInputElement>;

export type MnemonicExportProps = {
  label: string;
  phrases?: string[];
};

type State = {
  tags: string[];
};
export type MnemonicSelectProps = {
  handleExport: () => void;
  handleImport: () => void;
};
