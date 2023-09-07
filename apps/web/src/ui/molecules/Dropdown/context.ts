import { createContext } from "@orderbook/core/utils";

import { UseDropdownReturn } from "./types";

export const [DropdownProvider, useDropdownContext] =
  createContext<UseDropdownReturn>({
    contextName: "DropdownContext",
  });
