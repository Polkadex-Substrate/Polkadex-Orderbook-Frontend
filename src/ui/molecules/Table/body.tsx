import { useFocusRing } from "@react-aria/focus";
import { useTableRow } from "@react-aria/table";
import { mergeProps } from "@react-aria/utils";
import { forwardRef, PropsWithChildren, RefObject, useRef } from "react";

import * as S from "./styles";
import * as T from "./types";

const Body = forwardRef(
  (
    { children, state, item, striped, border, fill }: PropsWithChildren<T.BodyForwardProps>,
    ref: RefObject<HTMLTableRowElement>
  ) => {
    const componentRef = useRef(null);

    const { rowProps, isPressed } = useTableRow(
      {
        node: item,
      },
      state,
      componentRef
    );
    const { isFocusVisible, focusProps } = useFocusRing();
    const isSelected = state.selectionManager.isSelected(item.key);

    return (
      <S.Body
        {...mergeProps(rowProps, focusProps)}
        isSelected={isSelected}
        outline={isFocusVisible}
        isPressed={isPressed}
        alternate={striped}
        border={border}
        fill={fill}
        ref={componentRef}>
        {children}
      </S.Body>
    );
  }
);

Body.displayName = "Body";
export { Body };
