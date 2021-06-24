import React, { Component } from 'react'
import * as S from "./styles"
import {  injectIntl } from 'react-intl';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { IntlProps } from 'src';
import { localeDate, setTradeColor } from 'src/helpers';
import { CustomDropdown, Spinner, CustomIcon, CustomIconToken, CustomButton, Decimal, CellData, Table, CustomSkeleton  } from "src/components";

import {
    Market,
    openOrdersCancelFetch,
    ordersCancelAllFetch,
    RootState,
    selectCancelOpenOrdersFetching,
    selectCurrentMarket,
    selectOpenOrdersFetching,
    selectOpenOrdersList,
    selectUserLoggedIn,
    userOpenOrdersFetch,
} from 'src/modules';
import { OrderCommon } from 'src/modules/types';

interface ReduxProps {
  currentMarket: Market | undefined;
  list: OrderCommon[];
  fetching: boolean;
  cancelFetching: boolean;
  userLoggedIn: boolean;
}

interface DispatchProps {
  userOpenOrdersFetch: typeof userOpenOrdersFetch;
  openOrdersCancelFetch: typeof openOrdersCancelFetch;
  ordersCancelAll: typeof ordersCancelAllFetch;
}

type Props = ReduxProps & DispatchProps & IntlProps;

export class OpenOrdersComponent extends React.Component<Props> {
  public componentDidMount() {
    const { currentMarket, userLoggedIn } = this.props;
    if (userLoggedIn && currentMarket) {
        this.props.userOpenOrdersFetch({ market: currentMarket });
    }
  }

  public componentWillReceiveProps(next: Props) {
      const { userLoggedIn, currentMarket } = next;
      const { userLoggedIn: prevUserLoggedIn, currentMarket: prevCurrentMarket } = this.props;

      if (!prevUserLoggedIn && userLoggedIn && currentMarket) {
          this.props.userOpenOrdersFetch({ market: currentMarket });
      } else if (userLoggedIn && currentMarket && prevCurrentMarket !== currentMarket) {
          this.props.userOpenOrdersFetch({ market: currentMarket });
      }
  }

  render() {
    const { list, fetching } = this.props;
    return ( 
      <>
      {list ? <S.OpenOrders> 
         <S.ContentHeader>
              <span>Date</span>
              <span>Pair</span>
              <span>Side</span>
              <span>Amount {this.currentMarketData().currentAskUnit}</span>
              <span>Price {this.currentMarketData().currentBidUnit}</span>
              <span>Total {this.currentMarketData().currentAskUnit}</span>
              <span>Filled</span>
              <span></span>
            </S.ContentHeader>
          {fetching ? <LoadingTransactions/> : 
            <S.ContentWrapper>
              {this.renderData() }
            </S.ContentWrapper> 
          }
    </S.OpenOrders> : 
    <p style={{textAlign: 'center'}}>There is no data to show</p>}
    </>
    )
  }
  private currentMarketData = () => {
     const currentAskUnit = this.props.currentMarket ? this.props.currentMarket.base_unit.toUpperCase() : '';
     const currentBidUnit = this.props.currentMarket ? this.props.currentMarket.quote_unit.toUpperCase() : '';
    return {
      currentAskUnit,
      currentBidUnit
    }
   
  }
  private renderData = () => {
    const { list, currentMarket } = this.props;

    return list.map((item: OrderCommon, index) => {
        const { id, price, created_at, remaining_volume, origin_volume, side } = item;
        const executedVolume = Number(origin_volume) - Number(remaining_volume);
        const remainingAmount = Number(remaining_volume);
        const total = Number(origin_volume) * Number(price);
        const filled = ((executedVolume / Number(origin_volume)) * 100).toFixed(2);
        const priceFixed = currentMarket ? currentMarket.price_precision : 0;
        const amountFixed = currentMarket ? currentMarket.amount_precision : 0;
        const orderSide = side === 'buy'
        return (
          <S.ContentItem key={id}>
            <S.ContentFlex>
              <CustomIcon icon="Clock" background="transparent" />
              {localeDate(created_at, 'fullDate')}
            </S.ContentFlex>
            <S.ContentFlex>
              <CustomIconToken icon="BTC" />
              {this.currentMarketData().currentAskUnit} / {this.currentMarketData().currentBidUnit}
            </S.ContentFlex>
            <S.ContentFlex>
              <CustomIcon icon={orderSide ? 'ArrowVerticalTop' : 'ArrowVerticalBottom'} background={orderSide ? 'green' : 'primary'} size="xsmall" />
              {side.toUpperCase()}
            </S.ContentFlex>
            <div>{Decimal.format(price, priceFixed, ',')} </div>
            <div>{Decimal.format(total, amountFixed, ',')} </div>
            <div>{Decimal.format(remainingAmount, amountFixed, ',')} </div>
            <div>{filled}%</div>
            <div>
              <button type="button" onClick={()=> this.handleCancel(index)} >
                <CustomIcon icon="Close" background="primary" />
              </button>
            </div>
          </S.ContentItem>
        )
    });
};

  private handleCancel = (index: number) => {
      const { list } = this.props;
      const orderToDelete = list[index];
      this.props.openOrdersCancelFetch({ order: orderToDelete, list });
  };

  private handleCancelAll = () => {
      const { currentMarket } = this.props;
      currentMarket && this.props.ordersCancelAll({ market: currentMarket.id });
  };
}

const mapStateToProps = (state: RootState): ReduxProps => ({
  currentMarket: selectCurrentMarket(state),
  list: selectOpenOrdersList(state),
  fetching: selectOpenOrdersFetching(state),
  cancelFetching: selectCancelOpenOrdersFetching(state),
  userLoggedIn: selectUserLoggedIn(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
  userOpenOrdersFetch: payload => dispatch(userOpenOrdersFetch(payload)),
  openOrdersCancelFetch: payload => dispatch(openOrdersCancelFetch(payload)),
  ordersCancelAll: payload => dispatch(ordersCancelAllFetch(payload)),
});

export type OpenOrdersProps = ReduxProps;

export const OpenOrders = injectIntl(
  connect(
      mapStateToProps,
      mapDispatchToProps,
  )(OpenOrdersComponent),
) as React.FunctionComponent;


const LoadingTransactions = () => {
  return(
    <S.ContentWrapper >
      <LoadingTransactionItem />
      <LoadingTransactionItem />
      <LoadingTransactionItem />
      <LoadingTransactionItem />
    </S.ContentWrapper>
  )
}
const LoadingTransactionItem = () => {
  return (
    <S.ContentItem >
    <div> <CustomSkeleton width='14rem' height="2rem"  style={{margin: 3}}/> </div>
    <S.ContentFlex> <CustomSkeleton width='5rem' height="2rem" style={{marginRight: 10}}/> <CustomSkeleton width='5rem' height="2rem"  style={{margin: 3}}/>  </S.ContentFlex>
    <div> <CustomSkeleton width='5rem' height="2rem"  style={{margin: 3}}/> </div>
    <div> <CustomSkeleton width='8rem' height="2rem" style={{margin: 3}}/> </div>
    <div> <CustomSkeleton width='8rem' height="2rem" style={{margin: 3}}/> </div>
    <div> <CustomSkeleton width='8rem' height="2rem" style={{margin: 3}}/> </div>
    <div> <CustomSkeleton width='12rem' height="2rem" style={{margin: 3}}/> </div>
  </S.ContentItem>
  )
}