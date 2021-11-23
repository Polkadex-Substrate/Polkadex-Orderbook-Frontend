import { ReactNode } from "react";

import { Sizes } from "../../../helpers";

export type Props = {
  isVisible: boolean;
  onClose: () => void;
  children: ReactNode;
  isBottomPosition?: boolean;
  isMessage?: boolean;
  size?: Sizes;
};
