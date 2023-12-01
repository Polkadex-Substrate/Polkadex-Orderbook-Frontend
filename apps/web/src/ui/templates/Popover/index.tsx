import * as PopoverRadix from "@radix-ui/react-popover";
import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";
import { isValidComponent } from "@polkadex/ux";

const Close = ({
  children,
  asChild,
  ...props
}: PropsWithChildren<PopoverRadix.PopoverCloseProps>) => {
  return (
    <PopoverRadix.Close asChild={asChild} {...props}>
      {asChild ? <div className="flex-1">{children}</div> : children}
    </PopoverRadix.Close>
  );
};

const Trigger = ({
  children,
  asChild,
  ...props
}: PropsWithChildren<PopoverRadix.PopoverTriggerProps>) => {
  return (
    <PopoverRadix.Trigger asChild={asChild} {...props}>
      {asChild ? <div>{children}</div> : children}
    </PopoverRadix.Trigger>
  );
};

const Content = ({
  children,
  className,
  ...props
}: PropsWithChildren<PopoverRadix.PopoverContentProps>) => {
  return (
    <PopoverRadix.Content
      className={twMerge(
        classNames(
          "bg-level-1 rounded-md border border-primary min-w-[8rem]",
          "z-50 shadow-md",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
        ),
        className
      )}
      {...props}
    >
      {children}
    </PopoverRadix.Content>
  );
};

const Popover = ({
  children,
  ...props
}: PropsWithChildren<PopoverRadix.PopoverProps>) => {
  const [TriggerComponent] = isValidComponent(children, Trigger);
  const [ContentComponent] = isValidComponent(children, Content);

  return (
    <PopoverRadix.Root {...props}>
      {TriggerComponent}
      <PopoverRadix.Portal>{ContentComponent}</PopoverRadix.Portal>
    </PopoverRadix.Root>
  );
};

Popover.Trigger = Trigger;
Popover.Content = Content;
Popover.Close = Close;

export { Popover };
