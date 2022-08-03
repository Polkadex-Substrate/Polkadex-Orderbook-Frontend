import { UsePopoverReturn } from "./types";

import { createContext } from "@polkadex/orderbook/utils/createContext";

export const [PopoverProvider, usePopoverContext] = createContext<UsePopoverReturn>({
  contextName: "PopoverContext",
});
