import { UseModalReturn } from "./types";

import { createContext } from "@polkadex/orderbook/utils/createContext";

export const [ModalProvider, useModalContext] = createContext<UseModalReturn>({
  contextName: "ModalContext",
});
