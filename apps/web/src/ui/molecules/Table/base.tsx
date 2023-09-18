import {
  Cell as TableCell,
  Column as TableColumn,
  Row as TableRow,
  TableBody,
  TableHeader,
} from "@react-stately/table";
import {
  CellProps,
  RowProps,
  SpectrumColumnProps,
  TableBodyProps,
  TableHeaderProps,
} from "@react-types/table";

import { BodyCustomProps, HeaderCustomProps } from "./types";

const TableRowBase = TableRow as (props: RowProps<any>) => JSX.Element;
const TableCellBase = TableCell as (props: CellProps) => JSX.Element;

const TableColumnBase = TableColumn as <T>(
  props: SpectrumColumnProps<T>,
) => JSX.Element;

type HeaderBaseProps<T> = HeaderCustomProps & TableHeaderProps<T>;

const TableHeaderBase = TableHeader as <T>(
  props: HeaderBaseProps<T>,
) => JSX.Element;

type BaseBodyProps<T> = BodyCustomProps & TableBodyProps<T>;

const TableBodyBase = TableBody as <T>(props: BaseBodyProps<T>) => JSX.Element;

export const Base = {
  TableRowBase,
  TableCellBase,
  TableColumnBase,
  TableHeaderBase,
  TableBodyBase,
};
