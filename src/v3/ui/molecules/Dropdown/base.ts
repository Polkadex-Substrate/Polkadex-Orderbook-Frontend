import { Item, Section } from "@react-stately/collections";
import { ItemProps, SectionProps } from "@react-types/shared";
import { Key, ReactNode } from "react";

type ItemBaseProps<T = object> = {
  icon?: ReactNode;
  command?: string;
  onAction?: (key: Key) => void;
} & ItemProps<T>;

export const ItemBase = Item as (props: ItemBaseProps) => JSX.Element;
export const SectionBase = Section as (props: SectionProps<object>) => JSX.Element;
