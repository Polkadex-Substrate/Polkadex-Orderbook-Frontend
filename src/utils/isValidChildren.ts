import { Children, isValidElement, ReactElement, ReactNode } from "react";

export const isValidChildren = (children: ReactNode) =>
  Children.toArray(children).filter((child) => isValidElement(child)) as ReactElement[];
