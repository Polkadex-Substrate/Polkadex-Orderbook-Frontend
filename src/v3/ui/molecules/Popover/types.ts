import { OverlayTriggerProps } from "@react-aria/overlays";
import {
  ForwardRefExoticComponent,
  PropsWithoutRef,
  ReactNode,
  RefAttributes,
  RefObject,
} from "react";

import { Content } from "./content";
import { Trigger } from "./trigger";
import { usePopover } from "./usePopover";

import { Placement } from "@polkadex/orderbook/utils/types";

export type PopoverProps = {
  children?: ReactNode[];
} & UsePopoverProps;

export type UsePopoverProps = {
  defaultOpen?: boolean;
  placement?: Placement;
  triggerType?: OverlayTriggerProps["type"];
  isDismissable?: boolean;
  offset?: number;
  shouldFlip?: boolean;
  shouldCloseOnBlur?: boolean;
  isKeyboardDismissDisabled?: boolean;
  shouldCloseOnInteractOutside?: (element: HTMLElement) => boolean;
  ref?: RefObject<HTMLElement>;
  popoverTriggerRef?: RefObject<HTMLElement>;
  popoverScrollRef?: RefObject<HTMLElement>;
} & UsePopover;
export type UsePopover = {
  onClose?: () => void;
  onOpen?: () => void;
  isOpen?: boolean;
};

export type UsePopoverReturn = ReturnType<typeof usePopover>;

export type PopoverComponent<T, P = {}> = ForwardRefExoticComponent<
  PropsWithoutRef<P> & RefAttributes<T>
> & {
  Trigger: typeof Trigger;
  Content: typeof Content;
};
