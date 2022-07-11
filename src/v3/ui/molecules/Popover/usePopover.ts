import { useButton } from "@react-aria/button";
import {
  useModal,
  useOverlay,
  useOverlayPosition,
  useOverlayTrigger,
} from "@react-aria/overlays";
import { useOverlayTriggerState } from "@react-stately/overlays";
import { useRef } from "react";

import * as T from "./types";

export function usePopover({
  defaultOpen = false,
  triggerType = "dialog",
  placement = "top",
  isDismissable = true,
  offset = 12,
  shouldFlip = true,
  shouldCloseOnBlur = false,
  isKeyboardDismissDisabled = false,
  shouldCloseOnInteractOutside,
}: T.UsePopoverProps) {
  const state = useOverlayTriggerState({ defaultOpen });

  const triggerRef = useRef(null);
  const overlayRef = useRef(null);

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
  });

  // useButton ensures that focus management is handled correctly,
  // across all browsers. Focus is restored to the button once the
  // popover closes.
  const { buttonProps } = useButton(
    {
      onPress: () => state.open(),
      elementType: "div",
    },
    triggerRef
  );

  // Hide content outside the modal from screen readers.
  const { modalProps } = useModal();

  // Handle interacting outside the dialog and pressing
  // the Escape key to close the modal.
  const overlay = useOverlay(
    {
      onClose: state.close,
      isOpen: state.isOpen,
      isDismissable,
      shouldCloseOnBlur,
      isKeyboardDismissDisabled,
      shouldCloseOnInteractOutside,
    },
    overlayRef
  );

  return {
    isOpen: state.isOpen,
    onClose: () => state.close(),
    onOpen: () => state.open(),
    placement,
    triggerRef,
    overlayRef,
    buttonProps,
    modalProps,
    positionProps,
    triggerProps,
    overlayTriggerProps: overlayProps,
    isDismissable,
    overlayProps: overlay.overlayProps,
  };
}
