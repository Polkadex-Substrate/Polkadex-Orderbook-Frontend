import { useContext, useEffect } from "react";

import { useAssetsProvider } from "../assetsProvider/useAssetsProvider";
import { IPublicAsset } from "../assetsProvider";

import { Context } from "./context";

export function useMarketsProvider() {
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
