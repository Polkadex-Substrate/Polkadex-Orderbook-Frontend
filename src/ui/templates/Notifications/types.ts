import { LinkHTMLAttributes } from "react";

export type CardProps = {
  title: string;
  message: string;
  type: "InformationAlert" | "ErrorAlert" | "AttentionAlert" | string;
  active?: boolean;
  time: string;
  actionUrl?: string;
  actionTitle?: string;
  onRemove: () => void;
} & Pick<LinkHTMLAttributes<HTMLLinkElement>, "href">;
