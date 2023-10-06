import { useRef } from "react";

import * as T from "./types";

export function useTable({
  selectionMode,
  selectionBehavior,
  hideLoading,
}: T.UseTableProps) {
  const tableRef = useRef(null);
  const rowRef = useRef(null);
  const cellRef = useRef(null);
  const headerRef = useRef(null);
  const columnRef = useRef(null);

  return {
    selectionMode,
    selectionBehavior,
    hideLoading,
    tableRef,
    rowRef,
    cellRef,
    headerRef,
    columnRef,
  };
}
