import { InputHTMLAttributes } from "react";

import { ITokens } from "src/utils/types";

export type InformationItemProps = {
  label?: string;
  text?: string | undefined;
  orientation?: "vertical" | "horizontal";
  color?: "white" | "red" | "green";
};

export type SearchProps = {
  value?: string;
  type?: "text" | "number";
  placeholder?: string;
  onChange?: (value: string) => void | undefined;
  disabled?: boolean;
  fullWidth?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export type PairProps = {
  token?: ITokens | undefined;
  pair?: boolean;
};

export type layoutProps = {
  activateMarkets: () => void;
  activateMarketsStatus: boolean;
};
