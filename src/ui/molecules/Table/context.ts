import { UseTableReturn } from "./types";

import { createContext } from "@polkadex/orderbook/utils/createContext";

export const [TableProvider, useTableContext] = createContext<UseTableReturn>({
  contextName: "TableContext",
});
