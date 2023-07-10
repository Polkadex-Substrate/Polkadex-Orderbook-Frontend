import { ReactNode } from "react";

export type Props = {
  heading?: string;
  children?: ReactNode;
  pathname: string;
  noBorder?: boolean;
};
