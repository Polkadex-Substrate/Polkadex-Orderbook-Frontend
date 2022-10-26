import { UseDropdownReturn } from "./types";

import { createContext } from "@polkadex/orderbook/utils/createContext";

export const [DropdownProvider, useDropdownContext] = createContext<UseDropdownReturn>({
  contextName: "DropdownContext",
});
