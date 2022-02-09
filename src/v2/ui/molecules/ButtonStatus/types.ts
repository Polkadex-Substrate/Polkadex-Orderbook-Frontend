import { ButtonHTMLAttributes } from "react";

export type Props = {
  heading: {
    text: string;
    loading?: string;
    success?: string;
  };
  loading?: boolean;
  success?: boolean;
  error?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;
