import { Children, forwardRef } from "react";
import { OverlayContainer } from "@react-aria/overlays";

import { PopoverProvider } from "./context";
import * as T from "./types";
import { usePopover } from "./usePopover";

export const Popover = ({
  defaultOpen,
  placement,
  triggerType,
  children,
  offset,
  shouldFlip,
  shouldCloseOnBlur,
  isKeyboardDismissDisabled,
  shouldCloseOnInteractOutside,
}: T.Props) => {
  const context = usePopover({
    defaultOpen,
    placement,
    triggerType,
    offset,
    shouldFlip,
    shouldCloseOnBlur,
    isKeyboardDismissDisabled,
    shouldCloseOnInteractOutside,
  });

  const [Trigger, Content] = Children.toArray(children);
  return (
    <PopoverProvider value={context}>
      <>
        {Trigger}

        {context.isOpen && <OverlayContainer>{Content}</OverlayContainer>}
      </>
    </PopoverProvider>
  );
};
