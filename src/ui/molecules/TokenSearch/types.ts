import { InputHTMLAttributes } from "react";

export type SearchProps = {
  fullWidth?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export type TokenSearchItemProps = {
  ticket: string;
  tokenName: string;
};
