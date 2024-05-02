"use client";

import { PropsWithChildren, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMeasure } from "react-use";

const Expandable = ({ children }: { children: ReactNode }) => {
  const [ref, bounds] = useMeasure<HTMLDivElement>();
  return (
    <motion.div
      animate={{ height: bounds.height ?? 0 }}
      className="border border-primary rounded-md overflow-hidden"
    >
      <div ref={ref} className="flex flex-col">
        {children}
      </div>
    </motion.div>
  );
};

const Item = ({
  onSelect,
  visible,
  children,
}: PropsWithChildren<{
  onSelect: () => void;
  visible: boolean;
}>) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={onSelect}
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
