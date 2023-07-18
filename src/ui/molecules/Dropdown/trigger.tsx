import { mergeRefs } from "@react-aria/utils";
import { forwardRef } from "react";

import { Popover } from "../Popover";

import { useDropdownContext } from "./context";
import * as T from "./types";

export const Trigger: T.DropdownComponent<object, HTMLElement> = forwardRef(
  ({ children }, ref) => {
    const { triggerProps, menuTriggerRef } = useDropdownContext();

    return (
      <Popover.Trigger ref={mergeRefs(menuTriggerRef, ref)} {...triggerProps}>
        {children}
      </Popover.Trigger>
    );
  }
);

Trigger.displayName = "Trigger";
