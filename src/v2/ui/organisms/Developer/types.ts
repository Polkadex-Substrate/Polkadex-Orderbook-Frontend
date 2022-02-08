import { InputHTMLAttributes } from "react";
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
  props?: InputHTMLAttributes<HTMLInputElement>;
};
