import { InputHTMLAttributes, SelectHTMLAttributes } from "react";

import { InjectedAccount } from "@polkadex/orderbook-modules";
export type Props = {
  title: string;
  buttonTitle?: string;
  buttonOnClick: () => void;
  buttonDisabled?: boolean;
  endpoint?: string;
  status?: "noStatus" | "loading" | "success" | "error";
  url?: string;
  isLoading?: boolean;
  error?: string;
  textFiled?: TextField[];
};

type TextField = {
  label: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  selectProps?: Partial<SelectHTMLAttributes<HTMLSelectElement>>;
  isSelect?: boolean;
  options?: InjectedAccount[];
};
