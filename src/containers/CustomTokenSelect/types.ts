import { InputHTMLAttributes, ReactNode } from "react";
import { ITokens } from "src/utils/types";

export type InformationItemProps = {
  label?: string;
  text?: string | undefined;
  orientation?: "vertical" | "horizontal";
  color?: "white" | "red" | "green";
};

export type SearchProps = {
  fullWidth?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export type TokenProps = {
  ticket?: ITokens | undefined;
  tokenName?: string;
  balance?: string | number | ReactNode;
  amount?: string | number | ReactNode;
  amountInFiat?: string | number | ReactNode;
  isLoggedIn?:boolean
};

export type layoutProps = {
  activateMarkets: () => void;
  activateMarketsStatus: boolean;
};
