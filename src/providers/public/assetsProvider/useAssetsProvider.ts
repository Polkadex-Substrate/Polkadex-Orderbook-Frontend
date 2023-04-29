import { useContext } from "react";

import { Context } from "./context";

export function useAssetsProvider() {
  const state = useContext(Context);
  if (!Context) {
    const error = new Error("Assets context is undefined");
    error.name = "ContextError";
    Error?.captureStackTrace?.(error, useContext);
    throw error;
  }

  return {
    ...state,
  };
}
