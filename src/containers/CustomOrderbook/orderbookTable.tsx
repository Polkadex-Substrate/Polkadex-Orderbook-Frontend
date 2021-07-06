import React, { Component } from 'react'
import { CellData } from 'src/components/Table';
import { CustomSkeleton, mapValues } from "src/components"
import * as S from "./styles"
import { OrderbookTableCol } from "./OrderbookTableCol"
export interface CombinedOrderBookProps {
  /**
   * Data which is used to render Asks Table.
   */
  dataAsks: CellData[][];
  /**
   * Data which is used to render Bids Table.
   */
  dataBids: CellData[][];
  /**
   * Max value of volume which is used to calculate width of background row
   */
  maxVolume?: number;
  /**
   * Data which is used to calculate width of each Asks background row
   */
  orderBookEntryAsks: number[];
  /**
   * Data which is used to calculate width of each Bids background row
   */
  orderBookEntryBids: number[];
  /**
   * Sets Asks row background color
   */
  rowBackgroundColorAsks?: string;
  /**
   * Sets Bids row background color
   */
  rowBackgroundColorBids?: string;
  /**
   * Callback that is called when a Asks market is selected
   */
  onSelectAsks: (orderIndex: string) => void;
  /**
   * Callback that is called when Bids a market is selected
   */
  onSelectBids: (orderIndex: string) => void;
  /**
   * Sets component breakpoint
   */
  isLarge: boolean;
  /**
   * Sets last price
   */
  lastPrice: React.ReactNode;
  /**
   * Check if data exist in asks
   */
  noDataAsks: boolean;
  /**
   * Check if data exist in bids
   */
  noDataBids: boolean;
  /**
   * No data message for bids and asks message
   */
  noDataMessage: string;

  loading?: boolean;
  baseUnit?: string;
  baseQuote?: string;
}


export class OrderbookTable extends React.PureComponent<CombinedOrderBookProps> {
  public componentDidMount() {
    const scroll = document.getElementsByClassName('cr-order-book')[0];

    if (!this.props.isLarge && scroll) {
      scroll.scrollTop = scroll.scrollHeight;
    }
}

public componentWillReceiveProps(next: CombinedOrderBookProps) {
    const scroll = document.getElementsByClassName('cr-order-book')[0];

    if (next.isLarge !== this.props.isLarge && !next.isLarge && scroll) {
        scroll.scrollTop = scroll.scrollHeight;
    }
}
  render() {
    const {
      loading,
      baseUnit,
      baseQuote,
      dataAsks,
      dataBids,
      maxVolume,
      orderBookEntryAsks,
      orderBookEntryBids,
      rowBackgroundColorAsks,
      rowBackgroundColorBids,
      onSelectAsks,
      onSelectBids,
      lastPrice,
      noDataAsks,
      noDataBids,
      noDataMessage,
  } = this.props;

  return (
    <> 
    {loading ? 
    <>
      <LoadingContainer />
      <S.Select>
        <CustomSkeleton
          width="4rem"
          style={{ display: "inline-block", marginLeft: 5 }}
        />
      </S.Select>
      <LoadingContainer />
    </>  
    : 
    <>  
      <OrderbookTableCol
        side='right'
        baseUnit={baseUnit}
        baseQuote={baseQuote}
        loading={loading}
        data={dataAsks}
        rowBackgroundColor={rowBackgroundColorAsks}
        maxVolume={maxVolume}
        orderBookEntry={orderBookEntryAsks}
        onSelect={onSelectAsks}
      />
      <S.Select>
        <S.LastPriceWrapper>
          Latest Price
          {lastPrice}
        </S.LastPriceWrapper>
      </S.Select>
      <OrderbookTableCol
        side='right'
        baseUnit={baseUnit}
        baseQuote={baseQuote}
        loading={loading}
        data={dataBids}
        rowBackgroundColor={rowBackgroundColorBids}
        maxVolume={maxVolume}
        orderBookEntry={orderBookEntryBids}
        onSelect={onSelectBids}
        isSell
      />
    </> }
    </>
  );
  }
};


const LoadingContainer = () => {
  return (
    <S.BoxContent>
      <LoadingItems />
      <LoadingItems />
      <LoadingItems />
      <LoadingItems />
      <LoadingItems />
      <LoadingItems />
      <LoadingItems />
      <LoadingItems />
      <LoadingItems />
    </S.BoxContent>
  )
}
const LoadingItems = () => {
  return (
    <S.OrderbookItem style={{marginBottom: '0.8rem'}}>
        <CustomSkeleton height="1.5rem" />
        <CustomSkeleton height="1.5rem" />
        <CustomSkeleton height="1.5rem"/>
    </S.OrderbookItem>
  )
}