import { useRouter } from "next/router";
import { useEffect, useContext } from "react";
import { defaultConfig } from "@polkadex/orderbook-config";
import { Context } from "./context";

export const useLogOut = () => {
  const router = useRouter();
  const state = useContext(Context);

  const user = state.user;

  if (!Context) {
    const error = new Error("Auth context is undefined");
    error.name = "ContextError";
    Error?.captureStackTrace?.(error, useContext);
    throw error;
  }

  useEffect(() => {
    // We have to remove it when profile context created
    if (!user) router.reload();
  }, [user]);

  return { ...state };
};
