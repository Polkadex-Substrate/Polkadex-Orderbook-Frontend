import { Notification } from "@polkadex/orderbook-modules";

export type NotificationsProps = {
  notifications: Notification[];
};

export type CardProps = {
  onRemove: () => void;
} & Notification;
