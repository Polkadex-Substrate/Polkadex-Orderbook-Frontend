import { useEffect, useReducer } from "react";
import { ApiPromise } from "@polkadot/api";
import { defaultConfig } from "@orderbook/core/config";
import {
  createApi,
  statics,
} from "@orderbook/core/providers/public/nativeApi/statics";

import { Provider } from "./context";
import { nativeApiReducer, initialState } from "./reducer";
import * as T from "./types";
import * as A from "./actions";

export const NativeApiProvider: T.NativeApiComponent = ({ children }) => {
  const [state, dispatch] = useReducer(nativeApiReducer, initialState);
  const shouldRangerConnect =
    !state.timestamp && !state.connected && !state.api;

  useEffect(() => {
    const onReady = (api: ApiPromise) => dispatch(A.nativeApiConnectData(api));
    const onConnectError = () => {
      dispatch(A.nativeApiConnectError());
    };
    if (shouldRangerConnect) {
      createApi(defaultConfig.polkadexChain)
        .then(() => {
          statics.api.on("ready", () => onReady(statics.api));
          statics.api.on("error", () => onConnectError());
        })
        .catch((e) => {
          console.error("[api provider]", e);
          onConnectError();
        });
    }
  }, [shouldRangerConnect, dispatch]);

  return (
    <Provider
      value={{
        ...state,
      }}
    >
      {children}
    </Provider>
  );
};
