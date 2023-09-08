import { mergeProps } from "@react-aria/utils";
import { useMenuTriggerState } from "@react-stately/menu";
import { useRef } from "react";
import { useMenuTrigger } from "react-aria";

import * as T from "./types";
export function useDropdown(props: T.UseDropdownProps) {
  const {
    type,
    trigger,
    isDisabled,
    closeOnSelect = true,
    ...popoverProps
  } = props;

  const menuPopoverRef = useRef<HTMLDivElement>(null);
  const menuScrollRef = useRef<HTMLUListElement>(null);
  const menuTriggerRef = useRef<HTMLElement>(null);
  const menuContentRef = useRef(null);
  const menuItemRef = useRef<HTMLDivElement>(null);

  // Create state based on the incoming props
  const state = useMenuTriggerState(props);

  // Get props for the menu trigger and menu elements
  const { menuTriggerProps, menuProps } = useMenuTrigger(
    { type, trigger, isDisabled },
    state,
    menuTriggerRef,
  );

  return {
    menuProps,
    popoverProps,
    menuPopoverRef,
    menuScrollRef,
    menuTriggerRef,
    menuContentRef,
    menuItemRef,
    state,
    closeOnSelect,
    triggerProps: mergeProps(props, menuTriggerProps),
  };
}
