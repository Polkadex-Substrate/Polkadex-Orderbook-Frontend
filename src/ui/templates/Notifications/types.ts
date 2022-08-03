import { LinkHTMLAttributes } from "react";

import { Notification } from "@polkadex/orderbook-modules";

export type NotificationsProps = {
  onRemove: (e: number) => void;
  onRemoveAll: () => void;
  notifications: Notification[];
};

export type CardProps = {
  onRemove: () => void;
} & Omit<Notification, "id"> &
  Pick<LinkHTMLAttributes<HTMLLinkElement>, "href">;
