import { useEffect, useRef, useState } from "react";
import { appsyncOrderbookService } from "@orderbook/core/utils/orderbookService";

import * as T from "./types";
import { initialState, Provider } from "./context";
export const OrderbookServiceProvider = ({ children }) => {
  const [state, setState] = useState<T.OrderbookServiceState>(initialState);
  const isInitialized = useRef(false);
  const enable = async () => {
    if (!appsyncOrderbookService.isReady()) {
      await appsyncOrderbookService.init();
      // Markets and Assets are cached, so promise will not take much time
      const [markets, assets] = await Promise.all([
        appsyncOrderbookService.query.getMarkets(),
        appsyncOrderbookService.query.getAssets(),
      ]);

      setState({
        service: appsyncOrderbookService,
        markets,
        assets,
      });
    }
  };
  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      enable().then(() => console.log("Initializing orderbook service..."));
    }
  });
  return (
    <Provider
      value={{ ...state, enable, isReady: appsyncOrderbookService?.isReady() }}
    >
      {children}
    </Provider>
  );
};
