import { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";

export type Props = {
  label: string;
  description?: string;
  actionTitle?: string;
  isLocked?: boolean;
  hasBadge?: boolean;
  isVerified?: boolean;
} & InputHTMLAttributes<HTMLInputElement> &
  Pick<ButtonHTMLAttributes<HTMLButtonElement>, "onClick">;

export type EmptyProps = {
  title: string;
  description: string;
  actionTitle?: string;
  children?: ReactNode;
} & Pick<ButtonHTMLAttributes<HTMLButtonElement>, "onClick">;

export type ButtonProps = {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;
