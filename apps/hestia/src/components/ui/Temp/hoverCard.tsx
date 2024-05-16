// TEMP Component

"use client";

import * as HoverCardRadix from "@radix-ui/react-hover-card";
import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  Fragment,
  PropsWithChildren,
} from "react";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

const Trigger = forwardRef<
  ElementRef<typeof HoverCardRadix.Trigger>,
  ComponentPropsWithoutRef<typeof HoverCardRadix.Trigger>
>(({ children, ...props }, ref) => (
  <HoverCardRadix.Trigger ref={ref} {...props}>
    {children}
  </HoverCardRadix.Trigger>
));

Trigger.displayName = "Trigger";

interface ContentProps
  extends ComponentPropsWithoutRef<typeof HoverCardRadix.Content> {
  withArrow?: boolean;
  arrowProps?: HoverCardRadix.HoverCardArrowProps;
}

const Content = forwardRef<
  ElementRef<typeof HoverCardRadix.Content>,
  ContentProps
>(
  (
    {
      children,
      className,
      sideOffset = 12,
      withArrow = true,
      arrowProps,
      ...props
    },
    ref
  ) => {
    const { className: arrowClassname, ...restProps } = arrowProps || {};
    return (
      <HoverCardRadix.Portal>
        <HoverCardRadix.Content
          ref={ref}
          sideOffset={sideOffset}
          className={twMerge(
            classNames(
              "p-2 bg-level-1 rounded-md border border-primary text-sm",
              "z-50 overflow-hidden shadow-md animate-in fade-in-0 zoom-in-95 ",
              "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
              "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
            ),
            className
          )}
          {...props}
        >
          <Fragment>
            {children}
            {withArrow && (
              <HoverCardRadix.Arrow
                className={twMerge(classNames("fill-level-1"), arrowClassname)}
                {...restProps}
              />
            )}
          </Fragment>
        </HoverCardRadix.Content>
      </HoverCardRadix.Portal>
    );
  }
);
Content.displayName = "Content";

const HoverCard = ({
  children,
  openDelay = 100,
  closeDelay = 150,
  ...props
}: PropsWithChildren<HoverCardRadix.HoverCardProps>) => {
  return (
    <HoverCardRadix.Root
      openDelay={openDelay}
      closeDelay={closeDelay}
      {...props}
    >
      {children}
    </HoverCardRadix.Root>
  );
};

HoverCard.Trigger = Trigger;
HoverCard.Content = Content;

export { HoverCard };
