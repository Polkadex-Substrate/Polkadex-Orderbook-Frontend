import { ButtonHTMLAttributes } from "react";

export type Props = {
  heading?: {
    text?: string;
    loading?: string;
    success?: string;
  };
  isLoading?: boolean;
  isSuccess?: boolean;
  isSell?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;
