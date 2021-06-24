import React, { Component } from 'react'
import * as S from "./styles";
import { injectIntl } from 'react-intl';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import {
  Market,
  RootState,
  selectCurrentMarket,
  selectMarkets,
  selectMarketTickers, Ticker,
} from 'src/modules';
import { withRouter } from 'react-router-dom';

import { Decimal } from 'src/components/Decimal';
import { InformationItemProps, layoutProps, PairProps } from "./types";
import { CustomSkeleton } from 'src/components';

interface ReduxProps {
  currentMarket?: Market;
  markets: Market[];
  marketTickers: {
      [key: string]: Ticker,
  };
}

type Props =  ReduxProps;

class Toolbar extends Component<Props> {
  public render() {
    const { marketTickers, currentMarket } = this.props;
    const defaultTicker = { amount: 0, low: 0, last: 0, high: 0, volume: 0, price_change_percent: '+0.00%' };
    const bidUnit = currentMarket && currentMarket.quote_unit.toUpperCase();
    const isPositive = currentMarket && /\+/.test(this.getTickerValue("price_change_percent"));

    return (
      <S.InformationWrapper>
        <InformationItem
          label="Last price"
          text={currentMarket && `${Decimal.format(Number(this.getTickerValue('last')), currentMarket.price_precision, ',')} ${bidUnit}`}
        />
        <InformationItem
          label="Price 24h"
          text= {currentMarket && (marketTickers[currentMarket.id] || defaultTicker).price_change_percent}
          color={isPositive ? "green" : "red"}
        />
        <InformationItem
          label="Volumne 24h"
          text={currentMarket && `${Decimal.format(Number(this.getTickerValue('volume')), currentMarket.price_precision, ',')} ${bidUnit}`}
          />
        <S.InformationChangeWrapper>
          <InformationItem
            label="24h high"
            text={currentMarket && `${Decimal.format(Number(this.getTickerValue('high')), currentMarket.price_precision, ',')} ${bidUnit}`}
            color="green"
            orientation="horizontal"
          />
          <InformationItem
            label="24h low"
            text={currentMarket && `${Decimal.format(Number(this.getTickerValue('low')), currentMarket.price_precision, ',')} ${bidUnit}`}
            color="red"
            orientation="horizontal"
          />
      </S.InformationChangeWrapper>
    </S.InformationWrapper>
    )
  }
  private getTickerValue = (value: string) => {
    const { marketTickers, currentMarket } = this.props;
    const defaultTicker = { amount: 0, low: 0, last: 0, high: 0, volume: 0, price_change_percent: '+0.00%'};
    return currentMarket && (marketTickers[currentMarket.id] || defaultTicker)[value];
  };

}

const InformationItem = ({
  orientation = "vertical",
  label = "Label",
  text,
  color = "white",
}: InformationItemProps) => (
  <S.ItemWrapper orientation={orientation} color={color}>
    <span> {label} </span>
    <span>{text || <CustomSkeleton width="5rem" />}</span>
  </S.ItemWrapper>
);

const mapStateToProps = (state: RootState): ReduxProps => ({
  currentMarket: selectCurrentMarket(state),
  markets: selectMarkets(state),
  marketTickers: selectMarketTickers(state),
});

const CustomToolbar = withRouter(connect(mapStateToProps, {})(Toolbar) as any)

export  {
  CustomToolbar
}