import { HtmlHTMLAttributes, LiHTMLAttributes, ReactNode } from "react";

import { Props as IconProps } from "src/ui/components/Icon/types";

export type Props = {
  defaultActiveTabIndex?: number;
  children: ReactNode;
} & HtmlHTMLAttributes<HTMLUListElement>;

export type TabProps = {
  onClick?: (tabIndex: number) => void;
  tabIndex?: number;
  children?: ReactNode;
  isActive?: boolean;
  title: string;
  icon?: IconProps;
} & LiHTMLAttributes<HTMLLIElement>;
