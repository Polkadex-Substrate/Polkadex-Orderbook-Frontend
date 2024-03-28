import { useEffect, useReducer, useState } from "react";
import { ApiPromise } from "@polkadot/api";
import { defaultConfig } from "@orderbook/core/config";
import {
  createApi,
  statics,
} from "@orderbook/core/providers/public/nativeApi/statics";
import { LmpApi, SwapApi } from "@polkadex/polkadex-api";

import { Provider } from "./context";
import { nativeApiReducer, initialState } from "./reducer";
import * as T from "./types";
import * as A from "./actions";

export const NativeApiProvider: T.NativeApiComponent = ({ children }) => {
  const [state, dispatch] = useReducer(nativeApiReducer, initialState);
  const [lmp, setLmp] = useState<LmpApi>();
  const [swapApi, setSwapApi] = useState<SwapApi>();
  const shouldRangerConnect =
    !state.timestamp && !state.connected && !state.api;

  useEffect(() => {
    const onReady = (api: ApiPromise) => {
      const lmp = new LmpApi(api);
      const swapApi = new SwapApi(api);
      setLmp(lmp);
      setSwapApi(swapApi);
      dispatch(A.nativeApiConnectData(api));
    };
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
        lmp,
        swapApi,
      }}
    >
      {children}
    </Provider>
  );
};
