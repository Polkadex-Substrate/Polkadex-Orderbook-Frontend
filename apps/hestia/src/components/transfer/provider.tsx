"use client";

import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useContext,
  useMemo,
} from "react";
import { useElementSize } from "usehooks-ts";

const Provider = ({ value, children }: PropsWithChildren<{ value: State }>) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
type GenericRef<T = HTMLDivElement> = (node: T | null) => void;
type State = {
  headerRef: GenericRef;
  footerRef: GenericRef;
  helpRef: GenericRef;
  tableTitleRef: GenericRef;
  formwRef: GenericRef;
  filtersRef: GenericRef;
  tableMaxHeight: string;
};

// useElementSize Deprecated -> useResizeObserver
export const SizeProvider = ({ children }: { children: ReactNode }) => {
  const [headerRef, { height: headerHeight = 0 }] = useElementSize();
  const [footerRef, { height: footerHeight = 0 }] = useElementSize();
  const [helpRef, { height: helpHeight = 0 }] = useElementSize();
  const [tableTitleRef, { height: tableTitleHeight = 0 }] = useElementSize();
  const [formwRef, { height: formHeight = 0 }] = useElementSize();
  const [filtersRef, { height: filtersHeight = 0 }] = useElementSize();

  const tableMaxHeight = useMemo(
    () =>
      `calc(100vh - ${
        formHeight +
        headerHeight +
        footerHeight +
        helpHeight +
        tableTitleHeight +
        filtersHeight +
        1
      }px)`,
    [
      filtersHeight,
      headerHeight,
      footerHeight,
      formHeight,
      helpHeight,
      tableTitleHeight,
    ]
  );

  return (
    <Provider
      value={{
        headerRef,
        footerRef,
        helpRef,
        tableTitleRef,
        formwRef,
        tableMaxHeight,
        filtersRef,
      }}
    >
      {children}
    </Provider>
  );
};

const Context = createContext<State | null>(null);

export const useSizeProvider = () => {
  const state = useContext(Context);

  if (!Context) {
    const error = new Error("useConnectWalletProvider context is undefined");
    error.name = "ContextError";
    Error?.captureStackTrace?.(error, useContext);
    throw error;
  }

  return { ...state };
};
