import { mergeProps } from "@react-aria/utils";
import { Children, cloneElement, JSXElementConstructor, ReactElement } from "react";

import { usePopoverContext } from "./context";
import * as T from "./types";
import * as S from "./styles";

const Trigger = ({ children }: T.Props) => {
  const { triggerRef, triggerProps, buttonProps } = usePopoverContext();

  return (
    <S.TriggerWrapper as="div" ref={triggerRef} {...mergeProps(buttonProps, triggerProps)}>
      {children}
    </S.TriggerWrapper>
  );
};
export { Trigger };
