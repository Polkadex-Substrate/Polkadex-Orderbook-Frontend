"use client";

import { ComponentProps, PropsWithChildren } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMeasure } from "react-use";
import { twMerge } from "tailwind-merge";

const Expandable = ({ children, className }: ComponentProps<"div">) => {
  const [ref, bounds] = useMeasure<HTMLDivElement>();
  return (
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
