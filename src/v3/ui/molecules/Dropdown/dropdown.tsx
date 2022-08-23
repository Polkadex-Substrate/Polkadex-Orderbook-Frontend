import { Children, forwardRef } from "react";

import { Popover } from "../Popover";

import { DropdownProvider } from "./context";
import * as T from "./types";
import { useDropdown } from "./useDropdown";

const Dropdown: T.DropdownComponent<T.DropdownProps> = forwardRef(
  ({ children, ...props }: T.DropdownProps, _) => {
    const context = useDropdown(props);
    const [Trigger, Menu] = Children.toArray(children);

    return (
      <DropdownProvider value={context}>
        <Popover
          isOpen={context.state.isOpen}
          onClose={context.state.close}
          {...context.popoverProps}>
          {Trigger}
          <Popover.Content>{Menu}</Popover.Content>
        </Popover>
      </DropdownProvider>
    );
  }
);

Dropdown.displayName = "Dropdown";

Dropdown.defaultProps = {
  placement: "bottom start",
};

export default Dropdown as T.DropdownBaseComponent;
