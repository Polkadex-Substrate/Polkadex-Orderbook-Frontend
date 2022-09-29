import { AllHTMLAttributes } from "react";

import { IIcons } from "@polkadex/orderbook/utils/types";
export type Props = {
  address: string;
  onNavigate: (value: string) => void;
  logout: () => void;
};

export type Card = {
  title: string;
  description?: string;
  icon: IIcons;
} & Pick<AllHTMLAttributes<HTMLDivElement>, "onClick">;
