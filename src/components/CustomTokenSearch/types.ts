import { InputHTMLAttributes } from "react";
import { ITokens, ITokensName } from "src/utils/types";

export type SearchProps = {
  fullWidth?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export type TokenSearchItemProps = {
  ticket: ITokens;
  tokenName: string;
};
