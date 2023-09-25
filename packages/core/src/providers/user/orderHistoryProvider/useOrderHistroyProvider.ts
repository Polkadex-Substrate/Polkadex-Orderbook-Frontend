import { useContext } from "react";

import { Context } from "./context";

export function useOrderHistoryProvider() {
  const state = useContext(Context);

  if (!Context) {
    const error = new Error("Order history context is undefined");
    error.name = "ContextError";
    Error?.captureStackTrace?.(error, useContext);
    throw error;
  }
  return {
    ...state,
  };
}
