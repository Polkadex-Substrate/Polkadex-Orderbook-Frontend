import { LinkHTMLAttributes } from "react";
import { IIcons } from "src/utils/types";

export type NotificationCardProps = {
  title: string;
  message: string;
  icon: IIcons;
  active?: boolean;
} & Pick<LinkHTMLAttributes<HTMLLinkElement>, "href">;
