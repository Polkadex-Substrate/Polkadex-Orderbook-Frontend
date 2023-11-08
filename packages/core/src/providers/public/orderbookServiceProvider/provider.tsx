import { useEffect, useState } from "react";
import { appsyncOrderbookService } from "@orderbook/core/utils/orderbookService";

import * as T from "./types";
import { initialState, Provider } from "./context";
export const OrderbookServiceProvider = ({ children }) => {
  const [state, setState] = useState<T.OrderbookServiceState>(initialState);
  useEffect(() => {
    if (!appsyncOrderbookService.isReady()) {
      appsyncOrderbookService.init().then(() => {
        setState({ isReady: true, service: appsyncOrderbookService });
      });
    }
  }, []);
  return <Provider value={state}>{children}</Provider>;
};
