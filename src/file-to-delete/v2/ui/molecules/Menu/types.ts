import { LinkHTMLAttributes } from "react";

import { IIcons } from "@polkadex/orderbook/utils/types";
export type Props = {
  title: string;
  description: string;
  icon: IIcons;
  isBeta?: boolean;
} & Pick<LinkHTMLAttributes<HTMLLinkElement>, "href">;
