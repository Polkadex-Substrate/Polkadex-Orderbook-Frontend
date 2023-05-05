import { useCallback, useEffect, useMemo, useReducer } from "react";
import { ApiPromise, WsProvider } from "@polkadot/api";

import { Provider } from "./context";
import { nativeApiReducer, initialState } from "./reducer";
import * as T from "./types";
import * as A from "./actions";
import { RECONNECT_TIME } from "./constants";

import { defaultConfig } from "@polkadex/orderbook-config";
import { useSettingsProvider } from "@polkadex/orderbook/providers/public/settings";

export const NativeApiProvider: T.NativeApiComponent = ({ children }) => {
  const [state, dispatch] = useReducer(nativeApiReducer, initialState);
  const { onHandleError } = useSettingsProvider();
  const shouldRangerConnect = useMemo(
    () => !state.timestamp && !state.connecting,
    [state.timestamp, state.connecting]
  );

  const onConnectNativeApi = useCallback(async () => {
    dispatch(A.nativeApiConnectFetch());
    const provider = new WsProvider(defaultConfig.polkadexChain);
    const api = new ApiPromise({ provider, types: T.orderbookTypes });

    const onReady = () => dispatch(A.nativeApiConnectData(api));
    const onConnectError = () => {
      api.disconnect().then(() => setTimeout(() => onConnectNativeApi(), RECONNECT_TIME));
      onHandleError(
        `Polkadex can't connect to ${defaultConfig.polkadexChain}, reconnecting in 30 seconds`
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
      }}>
      {children}
    </Provider>
  );
};
