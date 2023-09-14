import { FocusScope } from "@react-aria/focus";
import { DismissButton, OverlayContainer } from "@react-aria/overlays";
import { mergeProps, mergeRefs } from "@react-aria/utils";
import { forwardRef, useRef } from "react";
import { CSSTransition } from "react-transition-group";

import { usePopoverContext } from "./context";
import * as S from "./styles";
import * as T from "./types";

export const Content: T.PopoverComponent = forwardRef(
  ({ children, ...props }, ref) => {
    const {
      isDismissable,
      onClose,
      overlayRef,
      positionProps,
      modalProps,
      overlayProps,
      isOpen,
      onOpen,
    } = usePopoverContext();

    const componentRef = useRef<HTMLDivElement | null>(null);
    return (
      <FocusScope restoreFocus>
        <CSSTransition
          in={isOpen}
          timeout={120}
          unmountOnExit
          onEnter={onOpen}
          onExited={onClose}
          nodeRef={componentRef}
        >
          <OverlayContainer>
            <S.ContentMain ref={componentRef}>
              <S.ContentWrapper
                ref={mergeRefs(overlayRef, ref)}
                {...mergeProps(overlayProps, positionProps, modalProps, props)}
              >
                {children}
                {isDismissable && <DismissButton onDismiss={onClose} />}
              </S.ContentWrapper>
            </S.ContentMain>
          </OverlayContainer>
        </CSSTransition>
      </FocusScope>
    );
  }
);

Content.displayName = "Content";
