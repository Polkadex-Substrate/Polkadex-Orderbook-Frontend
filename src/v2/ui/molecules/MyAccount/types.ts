import { AllHTMLAttributes } from "react";

import { IIcons } from "@polkadex/orderbook/utils/types";

export type Props = {
  balance?: string;
  address?: string;
  accountName?: string;
  isFull?: boolean;
};

export type Card = {
  title: string;
  description?: string;
  icon: IIcons;
} & Pick<AllHTMLAttributes<HTMLDivElement>, "onClick">;
