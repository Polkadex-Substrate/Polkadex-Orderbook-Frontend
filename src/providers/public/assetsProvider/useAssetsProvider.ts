import { useContext } from "react";

import { Context } from "./context";

export function useAssetsProvider() {
  const state = useContext(Context);
  const { fetchAssets, selectAllAssets, selectGetAsset, selectAssetsFetchSuccess } = state;
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
