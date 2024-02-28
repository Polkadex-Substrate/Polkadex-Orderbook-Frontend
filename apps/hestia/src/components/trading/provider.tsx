"use client";

import {
  PropsWithChildren,
  ReactNode,
  Ref,
  createContext,
  useContext,
  useMemo,
  useRef,
} from "react";
import { useResizeObserver } from "usehooks-ts";

import { useSizeObserver } from "@/hooks";

const Provider = ({ value, children }: PropsWithChildren<{ value: State }>) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
type State = {
  headerRef: Ref<HTMLDivElement>;
  footerRef: Ref<HTMLDivElement>;
  marketRef: Ref<HTMLDivElement>;
  placeOrderRef: Ref<HTMLDivElement>;
  tableMaxHeight: string;
  ordersMaxHeight: string;
};
export const SizeProvider = ({ children }: { children: ReactNode }) => {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);
  const { height: headerHeight = 0 } = useResizeObserver({
    ref: headerRef,
    box: "border-box",
  });
  const { height: footerHeight = 0 } = useResizeObserver({
    ref: footerRef,
    box: "border-box",
  });

  const [marketRef, marketHeight] = useSizeObserver();
  const [placeOrderRef, placeOrderHeight] = useSizeObserver();

  const tableMaxHeight = useMemo(
    () => `calc(100vh - ${marketHeight + headerHeight + footerHeight + 6}px)`,
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
