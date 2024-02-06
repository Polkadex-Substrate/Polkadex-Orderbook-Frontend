import { Typography, Dropdown, Pagination } from "@polkadex/ux";
import { forwardRef } from "react";

export const TablePagination = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      className="bg-backgroundBase flex items-center justify-between gap-2 px-3 py-1 border-t border-primary flex-wrap"
    >
      <Typography.Text appearance="primary">0 of 100 row(s)</Typography.Text>
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-2">
          <Typography.Text>Rows per page</Typography.Text>
          <Dropdown>
            <Dropdown.Trigger className="border rounded-md border-secondary-base p-1">
              10
              <Dropdown.Icon />
            </Dropdown.Trigger>
            <Dropdown.Content>
              <Dropdown.ItemCheckbox checked>10</Dropdown.ItemCheckbox>
              <Dropdown.ItemCheckbox>20</Dropdown.ItemCheckbox>
              <Dropdown.ItemCheckbox>30</Dropdown.ItemCheckbox>
              <Dropdown.ItemCheckbox>40</Dropdown.ItemCheckbox>
            </Dropdown.Content>
          </Dropdown>
        </div>
        <div>
          <Pagination>
            <Pagination.Page currentPage={1} pagesLength={10} />
            <Pagination.Content>
              <Pagination.Button arrowSide="left" />
              <Pagination.Button arrowSide="right" />
            </Pagination.Content>
          </Pagination>
        </div>
      </div>
    </div>
  );
});

TablePagination.displayName = "TablePagination";
