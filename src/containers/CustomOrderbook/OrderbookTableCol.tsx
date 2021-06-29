import React, { Component } from 'react'
import * as S from "./styles"
import { OrderbookItems } from "./OrderbookItems"
import { CellData } from 'src/components/Table';

export interface OrderBookProps {
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
  side?: 'left' | 'right';
  /**
   * Renders table title
   */
  title?: React.ReactNode;
  /**
   * Sets row background color
   */
  rowBackgroundColor?: string;
  /**
   * Callback that is called when a market is selected
   */
  onSelect: (orderIndex: string) => void;
  isSell?: boolean;
  baseUnit?: string;
  baseQuote?: string;
  loading?: boolean;
}

export const mapValues = (maxVolume?: number, data?: number[]) => {
  const resultData = data && maxVolume && data.length ? data.map(currentVolume => {
      // tslint:disable-next-line:no-magic-numbers
      return { value: (currentVolume / maxVolume) * 100};
  }) : [];

  return resultData;
};

export class OrderbookTableCol extends React.PureComponent<OrderBookProps> {
  public render() {
    const {
        data,
        maxVolume,
        orderBookEntry,
        side,
        loading,
        baseUnit,
        baseQuote,
        isSell,
        title,
        rowBackgroundColor,
        onSelect,
    } = this.props;
    const resultData = mapValues(maxVolume, orderBookEntry);

    const getRowWidth = (index: number) => {
        if (resultData && resultData.length) {
            return {
                width: `${resultData[index].value}%`,
            };
        }

        return {
            display: 'none',
        };
    };

    return (
      <S.Box>
      <S.BoxHeader>
        <span>Price{baseQuote}</span>
        <span>Amount{baseUnit}</span>
        <span>Total{baseQuote}</span>
      </S.BoxHeader>
      <S.BoxContent>
        <OrderbookItems
          data={data}
          side={side}
          rowBackground={getRowWidth}
          rowBackgroundColor={rowBackgroundColor}
          onSelect={onSelect}
          loading={loading}
          isSell={isSell}
        />
      </S.BoxContent>
    </S.Box>
    )
  }
}
