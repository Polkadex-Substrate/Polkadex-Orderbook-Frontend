import { Children, forwardRef } from "react";

import { PopoverProvider } from "./context";
import * as T from "./types";
import { usePopover } from "./usePopover";

const Popover: T.PopoverComponent<T.PopoverProps> = forwardRef(
  ({ children, ...props }, ref) => {
    const context = usePopover(props);

    const [Trigger, Content] = Children.toArray(children);
    return (
      <PopoverProvider value={context}>
        <>{Trigger}</>
        <> {Content}</>
      </PopoverProvider>
    );
  }
);

Popover.displayName = "Popover";

export default Popover as T.PopoverBaseComponent;
