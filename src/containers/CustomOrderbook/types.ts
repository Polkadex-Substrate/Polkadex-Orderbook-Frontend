import { ReactNode } from "react";

export type OrderbookTableProps = {
  quote?: string;
  price?: string;
  data?: CellData[][];
  onSelect: (orderIndex: string) => void;
  rowKeyIndexValue?: number;
  isSell?: boolean;
  loading?: boolean;
  maxVolume?: number;
  orderBookEntry?: number[];
  filters?: Filter[];
  selectedKey?: string;
};

export type OrderbookItemProps = {
  price?: CellData;
  isSell?: boolean;
  amountPair?: CellData;
  amountToken?: CellData;
};

export type CellData = string | number | ReactNode | undefined;

export type OrderbookProps = {
  /**
   * Data which is used to render Table.
   */
  data: CellData[][];
  /**
   * Max value of volume which is used to calculate width of background row
   */
  maxVolume?: number;
  /**
   * Data which is used to calculate width of each background row
   */
  orderBookEntry?: number[];
  /**
   * Defines a position of background row
   */
  side?: "left" | "right";
  /**
   * Renders table header
   */
  headers?: string[];
  /**
   * Renders table title
   */
  title?: ReactNode;
  /**
   * Sets row background color
   */
  rowBackgroundColor?: string;
  /**
   * Callback that is called when a market is selected
   */
  onSelect: (orderIndex: string) => void;
};

export type TableState = {
  /**
   * Selected filter
   */
  activeFilter?: string;
  /**
   * Filtered data
   */
  resultData?: CellData[][];
  /**
   * Key of selected row
   */
  selectedRowKey?: string;
};

export interface Filter {
  name: string;
  filter: (cell: CellData[]) => boolean;
}
