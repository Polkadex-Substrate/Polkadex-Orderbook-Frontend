import { mergeRefs } from "@react-aria/utils";
import { forwardRef } from "react";

import { Popover } from "../Popover";

import { useDropdownContext } from "./context";
import * as T from "./types";

export const Trigger: T.DropdownComponent<{}, HTMLElement> = forwardRef(
  ({ children, ...props }, ref) => {
    const { triggerProps, menuTriggerRef } = useDropdownContext();

    return (
      <Popover.Trigger ref={mergeRefs(menuTriggerRef, ref)} {...triggerProps}>
        {children}
      </Popover.Trigger>
    );
  }
);

Trigger.displayName = "Trigger";
