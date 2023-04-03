import { useContext, useEffect } from "react";

import { Context } from "./context";

export function useBalancesProvider() {
  const state = useContext(Context);

  if (!Context) {
    const error = new Error("Recent trades context is undefined");
    error.name = "ContextError";
    Error?.captureStackTrace?.(error, useContext);
    throw error;
  }

  return {
    ...state,
  };
}
