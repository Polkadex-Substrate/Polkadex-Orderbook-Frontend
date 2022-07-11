import { FocusScope } from "@react-aria/focus";
import { DismissButton } from "@react-aria/overlays";
import { mergeProps } from "@react-aria/utils";

import { usePopoverContext } from "./context";
import * as S from "./styles";
import * as T from "./types";

export const Content = ({ children }: T.Props) => {
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
    <FocusScope restoreFocus>
      <S.ContentWrapper
        ref={overlayRef}
        {...mergeProps(overlayProps, overlayTriggerProps, positionProps, modalProps)}>
        {children}
        {isDismissable && <DismissButton onDismiss={onClose} />}
      </S.ContentWrapper>
    </FocusScope>
  );
};
