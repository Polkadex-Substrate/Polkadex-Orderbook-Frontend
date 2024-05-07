"use client";

import {
  ComponentProps,
  Dispatch,
  MouseEvent,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMeasure } from "react-use";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"div"> {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const Expandable = ({ open, setOpen, children, className }: Props) => {
  const [ref, bounds] = useMeasure<HTMLDivElement>();

  const handleOpen = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setOpen(!open);
    },
    [open, setOpen]
  );

  return (
    <Provider value={{ open, setOpen: handleOpen }}>
      <motion.div
        animate={{ height: bounds.height ?? 0 }}
        className={twMerge(
          "border border-primary rounded-md overflow-hidden",
          className
        )}
      >
        <div ref={ref} className="flex flex-col">
          {children}
        </div>
      </motion.div>
    </Provider>
  );
};

const Item = ({
  onSelect,
  visible,
  hasData,
  children,
}: PropsWithChildren<{
  onSelect: () => void;
  visible: boolean;
  hasData: boolean;
}>) => {
  const { open, setOpen } = useExpandable();
  const setSelect = (e: MouseEvent<HTMLButtonElement>) => {
    onSelect();
    setOpen(e);
  };
  return (
    <AnimatePresence>
      {((hasData && visible) || open) && (
        <motion.button
          type="button"
          onClick={hasData && !open ? setOpen : setSelect}
          className="hover:bg-level-1 transition-colors duration-200 border-primary/40 border-b last:border-b-none"
        >
          {children}
        </motion.button>
      )}
    </AnimatePresence>
  );
};

Expandable.Item = Item;
export { Expandable };

type State = {
  open: boolean;
  setOpen: (e: MouseEvent<HTMLButtonElement>) => void;
};
export const Context = createContext<State>({
  open: false,
  setOpen: () => {},
});

const Provider = ({ value, children }: PropsWithChildren<{ value: State }>) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useExpandable = () => {
  const state = useContext(Context);

  if (!Context) {
    const error = new Error("useTheaProvider context is undefined");
    error.name = "ContextError";
    Error?.captureStackTrace?.(error, useContext);
    throw error;
  }

  return { ...state };
};
