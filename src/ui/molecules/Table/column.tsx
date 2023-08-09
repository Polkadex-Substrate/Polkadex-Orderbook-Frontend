import { useFocusRing } from "@react-aria/focus";
import { useTableColumnHeader } from "@react-aria/table";
import { mergeProps } from "@react-aria/utils";
import { forwardRef, PropsWithChildren, Ref, useRef } from "react";

import * as S from "./styles";
import * as T from "./types";

const Column = forwardRef(
  (
    { state, column }: PropsWithChildren<T.ColumnForwardProps>,
    ref: Ref<HTMLTableRowElement>
  ) => {
    const componentRef = useRef();

    const { columnHeaderProps } = useTableColumnHeader({ node: column }, state, componentRef);

    const { isFocusVisible, focusProps } = useFocusRing();

    const arrowIcon = state.sortDescriptor?.direction === "ascending" ? "▲" : "▼";

    return (
      <S.Column
        {...mergeProps(columnHeaderProps, focusProps)}
        textAlign={column.colspan > 1}
        outline={isFocusVisible}
        iconVisibility={state.sortDescriptor?.column === column.key}
        ref={componentRef}>
        {column.rendered}
        {column.props.allowsSorting && <span aria-hidden="true">{arrowIcon}</span>}
      </S.Column>
    );
  }
);

Column.displayName = "Column";
export { Column };
