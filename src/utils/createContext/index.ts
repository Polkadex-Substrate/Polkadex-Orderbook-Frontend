import { createContext as createReactContext, useContext } from "react";

import { CreateContextOptions, CreateContextReturn } from "./types";

export function createContext<ContextType>({
  contextName,
  errorMessage = "`context` is undefined",
}: CreateContextOptions) {
  const Context = createReactContext<ContextType | undefined>(undefined);
  Context.displayName = contextName;

  const useMyContext = () => {
    const myContext = useContext(Context);
    if (!myContext) {
      const error = new Error(errorMessage);
      error.name = "ContextError";
      Error?.captureStackTrace?.(error, useContext);
      throw error;
    }
    return myContext;
  };

  return [Context.Provider, useMyContext, Context] as CreateContextReturn<ContextType>;
}
