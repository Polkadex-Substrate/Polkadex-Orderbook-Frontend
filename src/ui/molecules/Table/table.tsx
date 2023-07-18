import { useTable as useTableAria } from "@react-aria/table";
import { mergeProps } from "@react-aria/utils";
import { useTableState } from "@react-stately/table";
import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  PropsWithChildren,
  Ref,
  useRef,
} from "react";

import { Body as BodyComponent } from "./body";
import { Cell } from "./cell";
import { CheckboxCell } from "./checkboxCell";
import { CheckboxColumn } from "./checkboxColumn";
import { Column } from "./column";
import { TableProvider } from "./context";
import { Group } from "./group";
import { Header as HeaderComponent } from "./header";
import * as S from "./styles";
import * as T from "./types";
import { useTable } from "./useTable";

const Table = forwardRef((props: PropsWithChildren<T.TableForwardProps>) => {
  const { selectionMode, selectionBehavior, hideLoading, onRowAction, ...tableProps } = props;

  const context = useTable({
    selectionMode,
    selectionBehavior,
    hideLoading,
    ...tableProps,
  });

  const tableRef = useRef<HTMLTableElement>(null);
  const scrollRef = useRef<HTMLTableRowElement>(null);

  const state = useTableState({
    ...props,
    showSelectionCheckboxes:
      props.selectionMode === "multiple" && props.selectionBehavior !== "replace",
  });

  const { gridProps } = useTableAria(
    { ...tableProps, onRowAction, scrollRef },
    state,
    tableRef
  );

  const [Header, Body] = Children.toArray(props.children);

  const headerProps = isValidElement(Header) && cloneElement(Header);

  const bodyProps = isValidElement(Body) && cloneElement(Body);

  const { collection } = state;

  return (
    <TableProvider value={context}>
      <S.Table {...mergeProps(tableProps, gridProps)} ref={tableRef}>
        <Group as="thead">
          {collection.headerRows.map((headerRow) => (
            <HeaderComponent
              key={headerRow.key}
              item={headerRow}
              state={state}
              fill={headerProps.props.fill}
              border={headerProps.props.border}
              bgStyle={headerProps.props.bgStyle}>
              {[...headerRow.childNodes].map((column) =>
                column.props.isSelectionCell ? (
                  <CheckboxColumn key={column.key} column={column} state={state} />
                ) : (
                  <Column key={column.key} column={column} state={state} />
                )
              )}
            </HeaderComponent>
          ))}
        </Group>
        <Group as="tbody" ref={scrollRef}>
          {[...collection.body.childNodes].map((row) => (
            <BodyComponent
              key={row.key}
              item={row}
              state={state}
              striped={bodyProps.props.striped}
              fill={bodyProps.props.fill}
              border={bodyProps.props.border}>
              {[...row.childNodes].map((cell) =>
                cell.props.isSelectionCell ? (
                  <CheckboxCell key={cell.key} cell={cell} state={state} />
                ) : (
                  <Cell key={cell.key} cell={cell} state={state} />
                )
              )}
            </BodyComponent>
          ))}
        </Group>
      </S.Table>
    </TableProvider>
  );
});

Table.displayName = "Table";

export default Table as T.TableComponent<HTMLTableElement, T.TableForwardProps>;
