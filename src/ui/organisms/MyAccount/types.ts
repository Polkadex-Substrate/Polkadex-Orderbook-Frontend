import { ReactNode, AllHTMLAttributes } from "react";

export type Props = {
  children?: ReactNode;
  isHeader?: boolean;
  balance: string;
  address: string;
  accountName: string;
};

export type MyCurrentAccountProps = {
  name: string;
  address: string;
  isHeader?: boolean;
} & Pick<AllHTMLAttributes<HTMLDivElement>, "onClick">;
