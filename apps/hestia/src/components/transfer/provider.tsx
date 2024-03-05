"use client";

import {
  MutableRefObject,
  PropsWithChildren,
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useRef,
} from "react";
import { useResizeObserver } from "usehooks-ts";

const Provider = ({ value, children }: PropsWithChildren<{ value: State }>) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
type GenericRef<T = HTMLDivElement> = MutableRefObject<T | null>;
type State = {
  headerRef: GenericRef;
  helpRef: GenericRef;
  tableTitleRef: GenericRef;
  formwRef: GenericRef;
  filtersRef: GenericRef;
  interactionRef: GenericRef;
  tableMaxHeight: string;
  interactionHeight: number;
};

export const SizeProvider = ({ children }: { children: ReactNode }) => {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const helpRef = useRef<HTMLDivElement | null>(null);
  const tableTitleRef = useRef<HTMLDivElement | null>(null);
  const formwRef = useRef<HTMLDivElement | null>(null);
  const filtersRef = useRef<HTMLDivElement | null>(null);
  const interactionRef = useRef<HTMLDivElement | null>(null);

  const { height: helpHeight = 0 } = useResizeObserver({
    ref: helpRef,
    box: "border-box",
  });

  const { height: headerHeight = 0 } = useResizeObserver({
    ref: headerRef,
    box: "border-box",
  });

  const { height: tableTitleHeight = 0 } = useResizeObserver({
    ref: tableTitleRef,
    box: "border-box",
  });

  const { height: formHeight = 0 } = useResizeObserver({
    ref: formwRef,
    box: "border-box",
  });

  const { height: filtersHeight = 0 } = useResizeObserver({
    ref: filtersRef,
    box: "border-box",
  });

  const { height: interactionHeight = 0 } = useResizeObserver({
    ref: interactionRef,
    box: "border-box",
  });

  const tableMaxHeight = useMemo(
    () =>
      `calc(100vh - ${
        formHeight +
        headerHeight +
        helpHeight +
        tableTitleHeight +
        filtersHeight +
        1
      }px)`,
    [filtersHeight, headerHeight, formHeight, helpHeight, tableTitleHeight]
  );

  return (
    <Provider
      value={{
        headerRef,
        helpRef,
        tableTitleRef,
        formwRef,
        tableMaxHeight,
        filtersRef,
        interactionRef,
        interactionHeight,
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
