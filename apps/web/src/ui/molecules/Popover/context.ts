import { createContext } from "@orderbook/core/utils";

import { UsePopoverReturn } from "./types";

export const [PopoverProvider, usePopoverContext] =
  createContext<UsePopoverReturn>({
    contextName: "PopoverContext",
  });
