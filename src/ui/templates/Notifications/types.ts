import { LinkHTMLAttributes } from "react";

import { Icons } from "@polkadex/web-helpers";

export type NotificationCardProps = {
  title: string;
  message: string;
  icon: Icons;
  active?: boolean;
} & Pick<LinkHTMLAttributes<HTMLLinkElement>, "href">;
