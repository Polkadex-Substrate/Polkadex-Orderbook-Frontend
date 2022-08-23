import {
  useModal,
  useOverlay,
  useOverlayPosition,
  useOverlayTrigger,
} from "@react-aria/overlays";
import { useOverlayTriggerState } from "@react-stately/overlays";
import { useCallback, useRef } from "react";

import * as T from "./types";

export function usePopover({
  defaultOpen = false,
  triggerType = "dialog",
  placement = "top",
  isDismissable = true,
  offset = 12,
  shouldFlip = true,
  onClose,
  isOpen,
  onOpenChange,
  popoverScrollRef,
}: T.UsePopoverProps) {
  const overlayRef = useRef(null);
  const triggerRef = useRef(null);

  const state = useOverlayTriggerState({
    defaultOpen,
    onOpenChange,
    isOpen,
  });

  // Get props for the trigger and overlay. This also handles
  // hiding the overlay when a parent element of the trigger scrolls
  // (which invalidates the popover positioning).
  const { triggerProps, overlayProps } = useOverlayTrigger(
    { type: triggerType },
    state,
    triggerRef
  );

  // Get popover positioning props relative to the trigger
  const { overlayProps: positionProps } = useOverlayPosition({
    targetRef: triggerRef,
    overlayRef,
    placement,
    offset,
    isOpen: state.isOpen,
    shouldFlip,
    scrollRef: popoverScrollRef,
  });

  // Hide content outside the modal from screen readers.
  const { modalProps } = useModal();

  const handleClose = useCallback(() => {
    onClose?.();
    state.close();
  }, [state, onClose]);

  // Handle interacting outside the dialog and pressing
  // the Escape key to close the modal.
  const overlay = useOverlay(
    {
      onClose: handleClose,
      isOpen: state.isOpen,
      isDismissable: isDismissable && state.isOpen,
    },
    overlayRef
  );

  return {
    isOpen: state.isOpen,
    onClose: handleClose,
    onOpen: state.open,
    state,
    placement,
    triggerRef,
    overlayRef,
    modalProps,
    positionProps,
    triggerProps,
    overlayTriggerProps: overlayProps,
    isDismissable,
    overlayProps: overlay.overlayProps,
  };
}
