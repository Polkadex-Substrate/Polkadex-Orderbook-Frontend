import { ReactNode } from "react";
import { IColors } from "@orderbook/core/utils";

type SharedProps = {
  balance?: string;
  address?: string;
  accountName?: string;
  isFull?: boolean;
};

export type SelectAccountProps = {
  isActive?: boolean;
  withButton?: boolean;
  isHeader?: boolean;
  fullDescription?: boolean;
  locked?: boolean;
  iconColor?: IColors;
  iconBackground?: IColors;
  isHoverable?: boolean;
} & SharedProps;

export type Props = {
  children?: ReactNode;
  isVerified?: boolean;
} & SharedProps;
