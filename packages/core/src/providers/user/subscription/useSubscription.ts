import { useContext } from "react";

import { Context } from "./context";

export const useSubscription = () => {
  const state = useContext(Context);

  if (!Context) {
    const error = new Error("Subscription context is undefined");
    error.name = "ContextError";
    Error?.captureStackTrace?.(error, useContext);
    throw error;
  }

  return { ...state };
};
