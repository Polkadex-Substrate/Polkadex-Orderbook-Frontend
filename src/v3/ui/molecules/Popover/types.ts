import { OverlayTriggerProps } from "@react-aria/overlays";
import { FC, MutableRefObject, ReactNode, Ref, RefObject } from "react";

import { Content } from "./content";
import { Trigger } from "./trigger";
import { usePopover } from "./usePopover";
export type ReactRef<T> = Ref<T> | RefObject<T> | MutableRefObject<T> | null;

export type Props = {
  children?: ReactNode;
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
  ref?: ReactRef<HTMLElement>;
};

export type UsePopoverReturn = ReturnType<typeof usePopover>;

export type PopoverComponent = FC<Props> & {
  Trigger: typeof Trigger;
  Content: typeof Content;
};

export type Placement =
  | "bottom"
  | "bottom left"
  | "bottom right"
  | "bottom start"
  | "bottom end"
  | "top"
  | "top left"
  | "top right"
  | "top start"
  | "top end"
  | "left"
  | "left top"
  | "left bottom"
  | "start"
  | "start top"
  | "start bottom"
  | "right"
  | "right top"
  | "right bottom"
  | "end"
  | "end top"
  | "end bottom";
