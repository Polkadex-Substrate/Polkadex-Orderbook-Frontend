"use client";

import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useContext,
  useMemo,
} from "react";
import { useElementSize } from "usehooks-ts";

import { useSizeObserver } from "@/hooks";

const Provider = ({ value, children }: PropsWithChildren<{ value: State }>) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
type GenericRef<T = HTMLDivElement> = (node: T | null) => void;
type State = {
  headerRef: GenericRef;
  footerRef: GenericRef;
  marketRef: GenericRef;
  placeOrderRef: GenericRef;
  tableMaxHeight: string;
  ordersMaxHeight: string;
};

export const SizeProvider = ({ children }: { children: ReactNode }) => {
  const [headerRef, { height: headerHeight }] = useElementSize();
  const [footerRef, { height: footerHeight }] = useElementSize();
  const [marketRef, marketHeight] = useSizeObserver();
  const [placeOrderRef, placeOrderHeight] = useSizeObserver();

  const tableMaxHeight = useMemo(
    () => `calc(100vh - ${marketHeight + headerHeight + footerHeight + 1}px)`,
    [headerHeight, footerHeight, marketHeight]
  );

  const ordersMaxHeight = useMemo(
    () => `${placeOrderHeight}px`,
    [placeOrderHeight]
  );

  return (
    <Provider
      value={{
        tableMaxHeight,
        ordersMaxHeight,
        headerRef,
        marketRef,
        placeOrderRef,
        footerRef,
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
