import { useContext } from "react";
import { Context } from "./context";

export const useOrders = () => {
  const state = useContext(Context);

  if (!Context) {
    const error = new Error("Orders context is undefined");
    error.name = "ContextError";
    Error?.captureStackTrace?.(error, useContext);
    throw error;
  }

  return { ...state };
};
