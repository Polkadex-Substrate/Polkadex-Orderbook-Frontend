import { ReactNode } from "react";

import { AlertTypes } from "@polkadex/orderbook-modules";

export type Props = {
  isVisible: boolean;
  onClose: () => void;
  type?: AlertTypes;
  title?: string;
  description?: string;
  children?: ReactNode;
};
