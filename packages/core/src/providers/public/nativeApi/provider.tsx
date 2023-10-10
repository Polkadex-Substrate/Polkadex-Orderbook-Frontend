import { useCallback, useEffect, useReducer } from "react";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { defaultConfig } from "@orderbook/core/config";

import { useSettingsProvider } from "../settings";

import { Provider } from "./context";
import { nativeApiReducer, initialState } from "./reducer";
import * as T from "./types";
import * as A from "./actions";
import { RECONNECT_TIME_MS } from "./constants";

const convertMillisecondsToSeconds = Math.floor(RECONNECT_TIME_MS / 1000);

export const NativeApiProvider: T.NativeApiComponent = ({ children }) => {
  const [state, dispatch] = useReducer(nativeApiReducer, initialState);
  const { onHandleError } = useSettingsProvider();
  const shouldRangerConnect =
    !state.timestamp && !state.connected && !state.api;

  const onConnectNativeApi = useCallback(async () => {
    dispatch(A.nativeApiConnectFetch());
    const provider = new WsProvider(defaultConfig.polkadexChain);
    const api = new ApiPromise({ provider, types: T.orderbookTypes });

    const onReady = () => dispatch(A.nativeApiConnectData(api));
    const onConnectError = () => {
      api
        .disconnect()
        .then(() => setTimeout(() => onConnectNativeApi(), RECONNECT_TIME_MS));
      onHandleError(
        `Polkadex can't connect to ${defaultConfig.polkadexChain}, reconnecting in ${convertMillisecondsToSeconds} seconds`
      );
      dispatch(A.nativeApiConnectError());
    };

    api.on("ready", onReady);
    api.on("error", onConnectError);

    return () => {
      api.off("ready", onReady);
      api.off("error", onConnectError);
      api.disconnect();
    };
  }, [onHandleError]);

  useEffect(() => {
    if (shouldRangerConnect) onConnectNativeApi();
  }, [shouldRangerConnect, onConnectNativeApi]);

  return (
    <Provider
      value={{
        ...state,
        onConnectNativeApi,
      }}
    >
      {children}
    </Provider>
  );
};
