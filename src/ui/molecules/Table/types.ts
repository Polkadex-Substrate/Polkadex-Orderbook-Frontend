import { TableState, TableStateProps } from "@react-stately/table";
import { GridNode } from "@react-types/grid";
import { SelectionBehavior, SelectionMode } from "@react-types/shared";
import {
  ForwardRefExoticComponent,
  HTMLAttributes,
  PropsWithoutRef,
  ReactNode,
  RefAttributes,
  TableHTMLAttributes,
} from "react";

import { Base } from "./base";
import { useTable } from "./useTable";

import { BackgroundStyle, BorderStyle, Colors } from "@polkadex/web-helpers";

// Table
export type TableProps<T = object> = {
  children?: ReactNode[];
  selectionMode?: SelectionMode;
  selectionBehavior?: SelectionBehavior;
  hideLoading?: boolean;
  onRowAction?: () => void;
} & TableStateProps<T>;

export type TableAttrProps = Omit<TableHTMLAttributes<unknown>, keyof TableProps<object>>;

export type UseTableAriaProps = {
  gridProps: TableAttrProps;
};
export type TableForwardProps = TableProps & TableAttrProps;

export type TableComponent<T, P = object> = ForwardRefExoticComponent<
  PropsWithoutRef<P> & RefAttributes<T>
> & {
  Cell: typeof Base.TableCellBase;
  Column: typeof Base.TableColumnBase;
  Header: typeof Base.TableHeaderBase;
  Row: typeof Base.TableRowBase;
  Body: typeof Base.TableBodyBase;
};

export type UseTableProps<T = object> = TableProps<T>;

export type UseTableReturn = ReturnType<typeof useTable>;

// Header
type HeaderProps<T> = {
  item: GridNode<T>;
  state: TableState<T>;
};

export type HeaderCustomProps = {
  fill?: Colors;
  border?: BorderStyle;
  bgStyle?: BackgroundStyle;
  striped?: boolean;
};

export type HeaderAttrProps = HeaderCustomProps &
  Omit<HTMLAttributes<unknown>, keyof HeaderProps<object>>;

export type HeaderForwardProps<T = unknown> = HeaderProps<T> & HeaderAttrProps;

//  Body
export type BodyCustomProps = {
  striped?: boolean;
  fill?: Colors;
  border?: BorderStyle;
};

type BodyProps<T> = {
  item: GridNode<T>;
  state: TableState<T>;
} & BodyCustomProps;

type BodyAttrProps = Omit<HTMLAttributes<unknown>, keyof BodyProps<object>>;
export type BodyForwardProps<T = unknown> = BodyProps<T> & BodyAttrProps;

//  Cell
type CellProps<T> = {
  cell: GridNode<T> & { rendered: React.ReactNode };
  state: TableState<T>;
};

type CellAttrProps = Omit<HTMLAttributes<unknown>, keyof CellProps<object>>;
export type CellForwardProps<T = unknown> = CellProps<T> & CellAttrProps;

//  Column
type ColumnProps<T> = {
  column: GridNode<T>;
  state: TableState<T>;
};

type ColumnAttrProps = Omit<HTMLAttributes<unknown>, keyof ColumnProps<object>>;
export type ColumnForwardProps<T = unknown> = ColumnProps<T> & ColumnAttrProps;

// Group
export type GroupAttrProps = {
  as?: keyof JSX.IntrinsicElements;
};

export type GroupProps = GroupAttrProps & HTMLAttributes<HTMLDivElement>;
