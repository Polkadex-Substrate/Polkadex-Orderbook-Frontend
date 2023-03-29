import { useCallback, useReducer } from "react";
import { Provider } from "./context";
import { rangerReducer, initialRangerState as initialState } from "./reducer";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { defaultConfig } from "@polkadex/orderbook-config";

import * as T from "./types";
import * as A from "./actions";

export const RangerProvider: T.RangerComponent = ({ onError, children }) => {
  const [state, dispatch] = useReducer(rangerReducer, initialState);

  // Actions
  const onConnectRanger = useCallback(async () => {
    let api: ApiPromise;
    try {
      /* Checking if the extension is installed. */
      const { web3Enable } = await import("@polkadot/extension-dapp");
      const extensions = await web3Enable("Polkadex Orderbook");
      if (extensions.length === 0) dispatch(A.rangerNoExtension());

      const createWs = () => {
        const provider = new WsProvider(defaultConfig.polkadexChain);
        api = new ApiPromise({ provider, types: T.orderbookTypes });

        api.on("ready", () => dispatch(A.rangerConnectData(api)));

        api.on("disconnected", () =>
          setTimeout(() => {
            console.log(`Reconnecting to ${defaultConfig.polkadexChain}`);
            createWs();
          }, defaultConfig.reconnectRangerTime)
        );

        api.on("error", () => {
          if (typeof onError === "function") {
            onError(`Polkadex can't connect to ${defaultConfig.polkadexChain}`);
          }
          dispatch(A.rangerConnectError());
        });
      };

      createWs();
      return () => {
        api.disconnect();
      };
    } catch (error) {
      onError(`Error connecting to Polkadex chain.. ${error.message}`);
    }
  }, []);

  return (
    <Provider
      value={{
        ...state,
        onConnectRanger,
      }}>
      {children}
    </Provider>
  );
};
