import { useButton } from "@react-aria/button";
import { mergeProps, mergeRefs } from "@react-aria/utils";
import {
  Children,
  cloneElement,
  forwardRef,
  JSXElementConstructor,
  ReactElement,
} from "react";

import { usePopoverContext } from "./context";
import * as T from "./types";

import { validateChild } from "@polkadex/orderbook/helpers/validateChild";
import { Button } from "@polkadex/orderbook-ui/molecules";

export const Trigger: T.PopoverComponent<object, HTMLElement> = forwardRef(
  ({ children, ...props }, ref) => {
    const { triggerRef, overlayTriggerProps, onOpen } = usePopoverContext();

    // useButton ensures that focus management is handled correctly,
    // across all browsers. Focus is restored to the button once the
    // popover closes.
    const { buttonProps } = useButton(
      {
        onPress: onOpen,
        elementType: "div",
        ...props,
      },
      triggerRef
    );

    const childrenComponent = typeof children === "string" ? <div>{children}</div> : children;

    const [child] = Children.toArray(childrenComponent);
    const hasChildren = !!validateChild(children, Button)[1]?.length;

    return cloneElement(child as ReactElement<any, string | JSXElementConstructor<any>>, {
      ...mergeProps(
        hasChildren
          ? {
              onPress: onOpen,
              ...props,
            }
          : buttonProps,
        overlayTriggerProps
      ),
      ref: mergeRefs(triggerRef, ref),
      as: "div",
      style: { outline: "none" },
    });
  }
);

Trigger.displayName = "Trigger";
