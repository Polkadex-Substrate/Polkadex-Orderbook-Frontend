import { Typography, Dropdown, Pagination } from "@polkadex/ux";
import { forwardRef } from "react";

type Props = {
  page?: number;
  rowsPerPage?: number;
  onSetRowsPerPage?: (row: number) => void;
  onPrevPage?: () => void;
  onNextPage?: () => void;
};

export const TablePagination = forwardRef<HTMLDivElement, Props>(
  ({ page, rowsPerPage, onPrevPage, onNextPage }, ref) => {
    const rows = [10, 20, 30];
    return (
      <div
        ref={ref}
        className="bg-backgroundBase flex items-center justify-end gap-2 px-3 py-1 border-t border-primary flex-wrap"
      >
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2">
            <Typography.Text>Rows per page</Typography.Text>
            <Dropdown>
              <Dropdown.Trigger className="border rounded-md border-secondary-base p-1">
                {rowsPerPage}
                <Dropdown.Icon />
              </Dropdown.Trigger>
              <Dropdown.Content>
                {rows.map((row, i) => (
                  <Dropdown.ItemCheckbox key={i} checked={row === rowsPerPage}>
                    {row}
                  </Dropdown.ItemCheckbox>
                ))}
              </Dropdown.Content>
            </Dropdown>
          </div>
          <div>
            <Pagination>
              <Typography.Text className="text-sm">Page {page}</Typography.Text>
              <Pagination.Content>
                <Pagination.Button arrowSide="left" onClick={onPrevPage} />
                <Pagination.Button arrowSide="right" onClick={onNextPage} />
              </Pagination.Content>
            </Pagination>
          </div>
        </div>
      </div>
    );
  }
);

TablePagination.displayName = "TablePagination";
