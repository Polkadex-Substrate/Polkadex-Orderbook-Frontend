import { useFocusRing } from "@react-aria/focus";
import { useTableCell } from "@react-aria/table";
import { mergeProps } from "@react-aria/utils";
import { forwardRef, PropsWithChildren, Ref, useRef } from "react";

import * as S from "./styles";
import * as T from "./types";

const Cell = forwardRef(
  ({ cell, state }: PropsWithChildren<T.CellForwardProps>, ref: Ref<HTMLElement>) => {
    const componentRef = useRef();

    const { gridCellProps } = useTableCell({ node: cell }, state, componentRef);
    const { isFocusVisible, focusProps } = useFocusRing();

    return (
      <S.Cell
        {...mergeProps(gridCellProps, focusProps)}
        outline={isFocusVisible}
        ref={componentRef}>
        {cell.rendered}
      </S.Cell>
    );
  }
);

Cell.displayName = "Cell";
export { Cell };
