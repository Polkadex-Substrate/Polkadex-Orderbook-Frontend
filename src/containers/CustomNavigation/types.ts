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
  onClick?: () => void
  flag?: LanguageIcons;
  active?: boolean
};

type LanguageIcons = "EN" | "ES" | "RU" | "De" | "Fr" | "Pt" | string; 
