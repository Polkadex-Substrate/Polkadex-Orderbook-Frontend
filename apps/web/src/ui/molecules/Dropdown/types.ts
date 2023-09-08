import { FocusableProviderProps } from "@react-aria/focus";
import { MenuTriggerAriaProps } from "@react-aria/menu";
import { TreeState } from "@react-stately/tree";
import { AriaMenuProps } from "@react-types/menu";
import type { Node } from "@react-types/shared";
import { AriaLabelingProps, DOMProps } from "@react-types/shared";
import {
  ForwardRefExoticComponent,
  HTMLAttributes,
  Key,
  PropsWithChildren,
  ReactNode,
  RefAttributes,
} from "react";
import { BackgroundStyle, BorderStyle, Colors } from "@orderbook/core/helpers";

import { UsePopoverProps } from "../Popover/types";

import { ItemBase, SectionBase } from "./base";
import { Button } from "./button";
import { Menu } from "./menu";
import { Trigger } from "./trigger";
import { useDropdown } from "./useDropdown";

export type DropdownProps = {
  children?: ReactNode[];
} & UseDropdownProps;

export type DropdownMenuProps<T = object> = {
  fill?: Colors;
  border?: BorderStyle;
  bgStyle?: BackgroundStyle;
  itemFill?: Colors;
} & AriaMenuProps<T> &
  DOMProps &
  AriaLabelingProps;

export type DropdownItemAttr<T = object> = {
  item: Node<T>;
  state: TreeState<T>;
  isVirtualized?: boolean;
  command?: string;
  onAction?: (key: Key) => void;
} & FocusableProviderProps &
  HTMLAttributes<HTMLAttributes<HTMLElement>>;

export type SectionProps<T = object> = {
  item: Node<T>;
  state: TreeState<T>;
};

export type UseDropdownProps = { closeOnSelect?: boolean } & UsePopoverProps &
  MenuTriggerAriaProps;

export type DropdownItemWrapperProps = {
  isSelected?: boolean;
  isDisabled?: boolean;
  isPressed?: boolean;
  isHovered?: boolean;
  isFocused?: boolean;
};

export type UseDropdownReturn = ReturnType<typeof useDropdown>;

export type DropdownComponent<
  T = object,
  P = HTMLElement,
> = ForwardRefExoticComponent<PropsWithChildren<T> & RefAttributes<P>>;

export type DropdownBaseComponent = DropdownComponent<DropdownProps> & {
  Trigger: typeof Trigger;
  Menu: typeof Menu;
  Item: typeof ItemBase;
  Button: typeof Button;
  Section: typeof SectionBase;
};
