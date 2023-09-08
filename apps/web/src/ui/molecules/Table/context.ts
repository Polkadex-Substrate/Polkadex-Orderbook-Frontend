import { createContext } from "@orderbook/core/utils";

import { UseTableReturn } from "./types";

export const [TableProvider, useTableContext] = createContext<UseTableReturn>({
  contextName: "TableContext",
});
