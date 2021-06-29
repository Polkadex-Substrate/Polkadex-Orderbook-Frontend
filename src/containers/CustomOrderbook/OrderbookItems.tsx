import React, { Component, FC, useState, useEffect, useCallback, useMemo } from 'react'
import * as S from "./styles"
import { useIntl } from 'react-intl';
import {CustomIcon, CustomSkeleton} from "src/components"

export type CellData = string | number | React.ReactNode | undefined | any;

export interface Filter {
    name: string;
    filter: (cell: CellData[]) => boolean;
}

export interface TableState {
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
}

export interface TableProps {
    /**
     * Data which is used to render Table. The first element
     * of array is used to render table head unless `noHead`
     * is true. the rest is used to render Table body.
     *
     * All the elements of an array should have the same length.
     */
    data: CellData[][];
    /**
     * Renders table head.
     */
    header?: React.ReactNode[];
    /**
     *  Pair name & filter is used to filter table data depending on a filter
     */
    filters?: Filter[];
    /**
     * Row's unique key, could be a number - element's index in data
     */
    rowKeyIndex?: number;
    /**
     * Key of selected row, could be a string
     */
    selectedKey?: string;
    /**
     * Callback called when a row is selected
     */
    onSelect?: (key: string) => void;
    /**
     * Header which is displayed above the table
     */
    titleComponent?: React.ReactNode;
    /**
     * Defines whether row background shows or not, and calculates width of it
     */
    rowBackground?: (row: number) => React.CSSProperties;
    /**
     * Defines from what side row background starts `(left, right)`
     * @default 'left'
     */
    side?: 'left' | 'right';
    /**
     * Sets row background color
     */
    rowBackgroundColor?: string;
    /**
     * Sets colspan count for empty table
     */
    colSpan?: number;
    loading?: boolean;
    isSell?: boolean;
}


export const OrderbookItems = (props: TableProps) => {
  const { formatMessage } = useIntl();
  const [activeFilter, setActiveFilter] = useState<TableState['activeFilter']>(undefined);
  const [resultData, setResultData] = useState<TableState['resultData']>(undefined);
  const [selectedRowKey, setSelectedRowKey] = useState<TableState['selectedRowKey']>(props.selectedKey);

  const {
    data,
    header,
    titleComponent,
    filters = [],
    rowKeyIndex,
    onSelect,
    rowBackground,
    side,
    isSell,
    rowBackgroundColor = 'rgba(184, 233, 245, 0.7)',
  } = props;
  const handleFilter = useCallback((item: Filter) => {
    if (!item.filter) {
        setResultData(props.data);

        return;
    }
    setActiveFilter(item.name);
    setResultData([...data].filter(item.filter));
  }, [data, props.data]);

  const handleSelect = useCallback((key: string) => () => {
      if (onSelect) {
          setSelectedRowKey(key);

          if (onSelect) {
              onSelect(key);
          }
      }
  }, [onSelect]);

  const renderFilters = useCallback(() => {
    return filters.map((item: Filter) => (
        <div
            key={item.name}
            onClick={() => handleFilter(item)}
        >
            {item.name}
        </div>
    ));
    }, [activeFilter, filters, handleFilter]);
   
    const renderRowCells = useCallback((row: CellData[],isSell:boolean) => {
      return row && row.length &&
              <>
                <S.OrderbookPrice>{row[0]}</S.OrderbookPrice> 
                <S.OrderbookAmount isSell={isSell}>{row[1]}</S.OrderbookAmount>
                <S.OrderbookItemWrapper>{row[2]}</S.OrderbookItemWrapper>
            </>

    }, [header, props.colSpan, formatMessage]);

    const renderBody = useCallback((rows: CellData[][], rowKeyIndexValue: number | undefined) => {
      const dataToBeMapped = resultData || rows;
      const rowElements = dataToBeMapped.map((r, i) => {
          const rowKey = String((rowKeyIndexValue !== undefined) ? r[rowKeyIndexValue] : i);
          return (
            <S.OrderbookItem     
              key={rowKey}
              onClick={handleSelect(rowKey)}
            >
              {renderRowCells(r, isSell)}
            </S.OrderbookItem>
          );
      });

    return (
        <>
        {rowElements}
        </>
    );
}, [handleSelect, renderRowCells, resultData, selectedRowKey]);

    const renderRowBackground = useCallback((i: number) => {
      const rowBackgroundResult = rowBackground ? rowBackground(i) : {};
      const style = {
          ...rowBackgroundResult,
          background: rowBackgroundColor,
      };

      return (rowBackground
          ? <S.VolumeSpan key={i} style={style} className="cr-table-background__row" />
          : null);
    }, [rowBackground, rowBackgroundColor]);


    const renderBackground = useCallback((rows: CellData[][]) => {
    const dataToBeMapped = resultData || rows;
    const renderBackgroundRow = (r: CellData[], i: number) => renderRowBackground(i);

    
    return (
        <S.OrderbookVolume >
            {rowBackground && dataToBeMapped.map(renderBackgroundRow)}
        </S.OrderbookVolume>
    );
    }, [resultData, side, renderRowBackground, rowBackground]);

    useEffect(() => {
      if (props.filters) {
          const newActiveFilter = props.filters.find(
              filter => filter.name === activeFilter,
          );

          if (newActiveFilter) {
              handleFilter(newActiveFilter);
          }
      }
    });

    useEffect(() => {
        setSelectedRowKey(props.selectedKey);
    }, [props.selectedKey]);

    return (
      <>
        {renderBody(data, rowKeyIndex)}
        {renderBackground(data)}
      </>
    )
  }

