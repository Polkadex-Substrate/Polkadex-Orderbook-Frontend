import { NativeApiAction } from "./actions";
import {
  NATIVEAPI_CONNECT_DATA,
  NATIVEAPI_CONNECT_ERROR,
  NATIVEAPI_CONNECT_FETCH,
  NATIVEAPI_DISCONNECT_DATA,
} from "./constants";
import { NativeApiState } from "./types";

export const initialState: NativeApiState = {
  connected: false,
  connecting: false,
  hasExtension: true,
};

export const nativeApiReducer = (
  state = initialState,
  action: NativeApiAction,
): NativeApiState => {
  switch (action.type) {
    case NATIVEAPI_CONNECT_FETCH:
      return {
        ...state,
        connected: false,
        connecting: true,
        timestamp: Math.floor(Date.now() / 1000),
      };

    case NATIVEAPI_CONNECT_DATA:
      return {
        ...state,
        connected: true,
        connecting: false,
        api: action.payload,
      };

    case NATIVEAPI_CONNECT_ERROR:
    case NATIVEAPI_DISCONNECT_DATA:
      return {
        ...state,
        connected: false,
        connecting: false,
        hasExtension: false,
      };
    default:
  }

  return state;
};
