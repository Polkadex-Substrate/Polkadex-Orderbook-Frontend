import { mergeProps, mergeRefs } from "@react-aria/utils";
import {
  Children,
  cloneElement,
  forwardRef,
  JSXElementConstructor,
  PropsWithChildren,
  ReactElement,
  Ref,
} from "react";

import { usePopoverContext } from "./context";

const Trigger = forwardRef(({ children }: PropsWithChildren<{}>, ref: Ref<HTMLElement>) => {
  const { triggerRef, triggerProps, buttonProps } = usePopoverContext();

  const child = Children.only(children);

  return cloneElement(child as ReactElement<any, string | JSXElementConstructor<any>>, {
    ...mergeProps(buttonProps, triggerProps),
    ref: mergeRefs(triggerRef, ref),
    as: "div",
  });
});

Trigger.displayName = "Trigger";
export { Trigger };
