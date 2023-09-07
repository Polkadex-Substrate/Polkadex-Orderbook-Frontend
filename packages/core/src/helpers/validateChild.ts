import { Children, ElementType, isValidElement, ReactNode } from "react";

export const validateChild = <T = ReactNode>(
  children: ReactNode | undefined,
  targetChild: ElementType,
): [T | ReactNode | undefined, ReactNode[] | undefined] => {
  const target: ReactNode[] = [];
  const withoutTargetChildren = Children.map(children, (item) => {
    if (!isValidElement(item)) return item;
    if (item.type === targetChild) {
      target.push(item);
      return null;
    }
    return item;
  });

  const targetChildren = target.length >= 0 ? target : undefined;

  return [withoutTargetChildren, targetChildren];
};
