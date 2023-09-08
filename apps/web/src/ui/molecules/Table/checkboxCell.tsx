import { useFocusRing } from "@react-aria/focus";
import { useTableCell, useTableSelectionCheckbox } from "@react-aria/table";
import { mergeProps } from "@react-aria/utils";
import { forwardRef, PropsWithChildren, Ref, useRef } from "react";

import { Checkbox } from "../Checkbox";

import * as S from "./styles";
import * as T from "./types";

const CheckboxCell = forwardRef(
  (
    { cell, state }: PropsWithChildren<T.CellForwardProps>,
    ref: Ref<HTMLElement>,
  ) => {
    const componentRef = useRef();

    const { gridCellProps } = useTableCell({ node: cell }, state, componentRef);
    const { isFocusVisible, focusProps } = useFocusRing();
    const { checkboxProps } = useTableSelectionCheckbox(
      { key: cell.parentKey },
      state,
    );
    return (
      <S.Cell
        {...mergeProps(gridCellProps, focusProps)}
        outline={isFocusVisible}
        ref={componentRef}
      >
        <Checkbox {...checkboxProps} />
      </S.Cell>
    );
  },
);

CheckboxCell.displayName = "CheckboxCell";
export { CheckboxCell };
