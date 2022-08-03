import { LinkHTMLAttributes } from "react";

import { Notification } from "@polkadex/orderbook-modules";

export type NotificationsProps = {
  notifications: Notification[];
};

export type CardProps = {
  onRemove: () => void;
} & Omit<Notification, "id"> &
  Pick<LinkHTMLAttributes<HTMLLinkElement>, "href">;
