import {
  useModal as useModalAria,
  usePreventScroll,
} from "@react-aria/overlays";
import { mergeProps } from "@react-aria/utils";
import { useOverlayTriggerState } from "@react-stately/overlays";
import { useRef } from "react";
import { useDialog, useOverlay } from "react-aria";

import * as T from "./types";
export function useModal({
  open,
  onClose,
  onOpen,
  isDismissable = true,
  preventClose,
  ...props
}: T.ModalProps) {
  // Handle interacting outside the dialog and pressing
  // the Escape key to close the modal.
  const modalRef = useRef(null);
  const headerRef = useRef(null);

  // Prevent scrolling while the modal is open, and hide content
  // outside the modal from screen readers.
  usePreventScroll();
  const { modalProps } = useModalAria();

  // Get props for the dialog and its title
  const { dialogProps, titleProps } = useDialog({}, headerRef);

  const state = useOverlayTriggerState({
    isOpen: open,
    onOpenChange: onOpen,
  });

  const { overlayProps, underlayProps } = useOverlay(
    {
      onClose,
      isOpen: state.isOpen,
      isDismissable: isDismissable && state.isOpen,
      ...props,
    },
    modalRef,
  );

  return {
    underlayProps,
    overlayProps,
    dialogProps: mergeProps(overlayProps, dialogProps, modalProps),
    modalRef,
    state,
    titleProps,
    onClose,
    isDismissable,
  };
}
