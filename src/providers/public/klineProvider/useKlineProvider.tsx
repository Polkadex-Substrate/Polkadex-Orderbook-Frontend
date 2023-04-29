import { useContext } from "react";

import { Context } from "./context";

export function useKlineProvider() {
  const state = useContext(Context);

  if (!Context) {
    const error = new Error("Kline context is undefined");
    error.name = "ContextError";
    Error?.captureStackTrace?.(error, useContext);
    throw error;
  }

  return {
    ...state,
  };
}
