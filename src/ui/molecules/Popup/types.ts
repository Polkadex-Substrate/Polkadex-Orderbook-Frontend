import { ReactNode } from "react";

import { Sizes } from "../../../helpers";

export type Props = {
  isVisible: boolean;
  onClose: () => void | undefined;
  children: ReactNode;
  isBottomPosition?: boolean;
  isRightPosition?: boolean;
  isMessage?: boolean;
  size?: Sizes;
};
