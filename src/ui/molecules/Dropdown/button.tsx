import { mergeRefs } from "@react-aria/utils";
import { forwardRef, useRef } from "react";

import { Trigger } from "./trigger";
import * as T from "./types";

export const Button: T.DropdownComponent<{}, HTMLButtonElement> = forwardRef(
  ({ children, ...props }, ref) => {
    const componentRef = useRef(null);
    return (
      <Trigger>
        <button ref={mergeRefs(componentRef, ref)} {...props}>
          {children}
        </button>
      </Trigger>
    );
  }
);

Button.displayName = "Button";
