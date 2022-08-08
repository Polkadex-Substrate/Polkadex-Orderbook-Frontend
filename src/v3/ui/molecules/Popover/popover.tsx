import { Children, forwardRef, RefObject } from "react";
import { CSSTransition } from "react-transition-group";

import { PopoverProvider } from "./context";
import * as S from "./styles";
import * as T from "./types";
import { usePopover } from "./usePopover";

const Popover = forwardRef(
  (
    {
      defaultOpen,
      placement,
      triggerType,
      children,
      offset,
      shouldFlip,
      shouldCloseOnBlur,
      isKeyboardDismissDisabled,
      shouldCloseOnInteractOutside,
      ...props
    }: T.PopoverProps,
    ref: RefObject<HTMLDivElement>
  ) => {
    const context = usePopover({
      defaultOpen,
      placement,
      triggerType,
      offset,
      shouldFlip,
      shouldCloseOnBlur,
      isKeyboardDismissDisabled,
      shouldCloseOnInteractOutside,
      ref,
      ...props,
    });

    const [Trigger, Content] = Children.toArray(children);
    return (
      <PopoverProvider value={context}>
        <>
          {Trigger}
          <CSSTransition
            key={S.ContentWrapper}
            in={context.isOpen}
            timeout={120}
            unmountOnExit
            onEnter={context.onOpen}
            onExited={context.onClose}>
            {Content}
          </CSSTransition>
        </>
      </PopoverProvider>
    );
  }
);

Popover.displayName = "Popover";

export default Popover as T.PopoverComponent<HTMLElement, T.PopoverProps>;
