import { AnchorHTMLAttributes } from "react";

import { IIcons } from "src/utils/types";

export type Props = {
  activateNotification: () => void;
};

export type NavProps = {
  text: string;
  icon: IIcons;
  active?: boolean;
  soon?: boolean;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export type LanguageCurrencyProps = {
  title?: string;
};

export type LanguageNameProps = {
  title?: string;
  flag?: LanguageIcons;
};

type LanguageIcons = "En" | "Es" | "De" | "Fr" | "Pt";
