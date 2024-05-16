// TEMP Component

"use client";

import {
  ComponentProps,
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";
import { RiArrowDownSLine } from "@remixicon/react";
import { useMeasure } from "react-use";
import { UseMeasureRef } from "react-use/lib/useMeasure";
import { Skeleton } from "@polkadex/ux";

import { HoverCard } from "./hoverCard";

const HoverInformation = ({ children }: { children: ReactNode }) => {
  const [ref, bounds] = useMeasure<HTMLAnchorElement>();
  const [open, setOpen] = useState(false);
  return (
    <Context.Provider value={{ open, setOpen, ref, width: bounds.width }}>
      <HoverCard open={open} onOpenChange={setOpen}>
        {children}
      </HoverCard>
    </Context.Provider>
  );
};

interface TriggerProps extends ComponentProps<typeof HoverCard.Trigger> {
  loading?: boolean;
}
const Trigger = ({ className, children, loading, ...props }: TriggerProps) => {
  const { setOpen, ref } = useContext(Context);

  return (
    <HoverCard.Trigger
      ref={ref}
      className={twMerge(classNames("group"), className)}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setOpen(true);
      }}
      {...props}
    >
      <Skeleton loading={loading} className="min-w-12 min-h-4">
        <div className="flex items-center gap-1">{children}</div>
      </Skeleton>
    </HoverCard.Trigger>
  );
};

const Content = ({
  className,
  children,
  ...props
}: ComponentProps<typeof HoverCard.Content>) => {
  const { width } = useContext(Context);

  return (
    <HoverCard.Content
      className={twMerge(
        classNames("flex flex-col gap-3 w-full max-w-[400px] p-4"),
        className
      )}
      style={{ minWidth: width }}
      sideOffset={4}
      withArrow
      {...props}
    >
      {children}
    </HoverCard.Content>
  );
};

const Arrow = ({ children, className, ...props }: ComponentProps<"svg">) => {
  return (
    children ?? (
      <RiArrowDownSLine
        className={twMerge(
          classNames(
            "w-3 h-3 text-primary group-hover:rotate-180 duration-300 transition-transform"
          ),
          className
        )}
        {...props}
      />
    )
  );
};

type State = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  ref: UseMeasureRef<HTMLAnchorElement> | null;
  width: number;
};

const Context = createContext<State>({
  open: false,
  setOpen: () => {},
  ref: null,
  width: 0,
});

HoverInformation.Trigger = Trigger;
HoverInformation.Content = Content;
HoverInformation.Arrow = Arrow;

export { HoverInformation };
