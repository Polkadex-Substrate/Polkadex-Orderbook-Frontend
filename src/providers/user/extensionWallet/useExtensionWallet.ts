import { useContext } from "react";
import { Context } from "./context";

export const useExtensionWallet = () => {
  const state = useContext(Context);

  if (!Context) {
    const error = new Error("ExtensionWallet context is undefined");
    error.name = "ContextError";
    Error?.captureStackTrace?.(error, useContext);
    throw error;
  }

  return { ...state };
};
