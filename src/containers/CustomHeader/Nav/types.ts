import { User } from "src/modules";

export type WalletProps = {
  user: User;
  disconnect?: () => void;
};

export type LanguageCurrencyProps = {
  title?: string;
};

export type LanguageNameProps = {
  onClick?: () => void
  flag?: LanguageIcons;
  active?: boolean
};

type LanguageIcons = "EN" | "ES" | "RU" | "De" | "Fr" | "Pt" | string; 
