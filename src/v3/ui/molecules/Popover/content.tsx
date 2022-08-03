import { FocusScope } from "@react-aria/focus";
import { DismissButton } from "@react-aria/overlays";
import { mergeProps, mergeRefs } from "@react-aria/utils";
import { forwardRef, PropsWithChildren, Ref } from "react";

import { usePopoverContext } from "./context";
import * as S from "./styles";

const Content = forwardRef(({ children }: PropsWithChildren<{}>, ref: Ref<HTMLDivElement>) => {
  const {
    isDismissable,
    onClose,
    overlayRef,
    positionProps,
    modalProps,
    overlayProps,
    overlayTriggerProps,
  } = usePopoverContext();

  return (
    <S.ContentMain>
      <FocusScope restoreFocus>
        <S.ContentWrapper
          {...mergeProps(overlayProps, overlayTriggerProps, positionProps, modalProps)}
          ref={mergeRefs(overlayRef, ref)}>
          {children}
          {isDismissable && <DismissButton onDismiss={onClose} />}
        </S.ContentWrapper>
      </FocusScope>
    </S.ContentMain>
  );
});

Content.displayName = "Content";
export { Content };
