import { createContext } from "@orderbook/core/utils";

import { UseModalReturn } from "./types";

export const [ModalProvider, useModalContext] = createContext<UseModalReturn>({
  contextName: "ModalContext",
});
