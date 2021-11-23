import { AnchorHTMLAttributes } from "react";

import { Icons } from "@polkadex/web-helpers";

export type Props = {
  activateNotification: () => void;
};

export type NavProps = {
  text: string;
  icon: Icons;
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
