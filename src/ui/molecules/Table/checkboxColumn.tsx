import { useFocusRing } from "@react-aria/focus";
import { useTableColumnHeader } from "@react-aria/table";
import { mergeProps } from "@react-aria/utils";
import { forwardRef, PropsWithChildren, useRef } from "react";
import { useTableSelectAllCheckbox, VisuallyHidden } from "react-aria";
import { TableState } from "react-stately";

import { Checkbox } from "../Checkbox";

import * as S from "./styles";
import * as T from "./types";

const CheckboxColumn = forwardRef(
  ({ state, column }: PropsWithChildren<T.ColumnForwardProps>) => {
    const componentRef = useRef();

    const isSingleSelectionMode = state.selectionManager.selectionMode === "single";

    const { columnHeaderProps } = useTableColumnHeader({ node: column }, state, componentRef);

    const { isFocusVisible, focusProps } = useFocusRing();

    const { checkboxProps } = useTableSelectAllCheckbox(state as TableState<unknown>);

    return (
      <S.Column
        {...mergeProps(columnHeaderProps, focusProps)}
        textAlign={column.colspan > 1}
        outline={isFocusVisible}
        iconVisibility={state.sortDescriptor?.column === column.key}
        ref={componentRef}>
        {isSingleSelectionMode && (
          <VisuallyHidden>{checkboxProps["aria-label"]}</VisuallyHidden>
        )}

        <Checkbox {...checkboxProps} />
      </S.Column>
    );
  }
);

CheckboxColumn.displayName = "CheckboxColumn";
export { CheckboxColumn };
