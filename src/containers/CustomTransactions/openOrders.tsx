import React, { Component } from 'react'
import * as S from "./styles"
import {  injectIntl } from 'react-intl';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { IntlProps } from 'src';
import { localeDate, setTradeColor } from 'src/helpers';
import { CustomDropdown, Spinner, CustomIcon, CustomIconToken, CustomButton, Decimal, CellData, Table, CustomSkeleton  } from "src/components";
import {CardProps} from "./types"

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
              <span></span>
              <span>Pair</span>
              <span>Date</span>
              <span>Amount</span>
              <span>Price</span>
              <span>Total</span>
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
        return ( <Card 
          key={id} 
          date={localeDate(created_at, 'fullDate')} 
          baseUnit={this.currentMarketData().currentAskUnit} 
          quoteUnit={this.currentMarketData().currentBidUnit}
          side={side.toUpperCase()}
          isSell={orderSide}
          price={Decimal.format(price, priceFixed, ',')}
          amount={Decimal.format(total, amountFixed, ',')}
          total={Decimal.format(remainingAmount, amountFixed, ',')}
          filled={filled}
          cancel={() => this.handleCancel(index)}/>
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
    <S.CardWrapper >
      <S.CardContainer> 
        <CustomSkeleton width='14rem' height="2rem"  style={{margin: 3}}/> 
      </S.CardContainer>
      <S.CardFlex> 
        <CustomSkeleton width='5rem' height="2rem" style={{marginRight: 10}}/> <CustomSkeleton width='5rem' height="2rem"  style={{margin: 3}}/>  
      </S.CardFlex>
      <S.CardContainer> <CustomSkeleton width='5rem' height="2rem"  style={{margin: 3}}/> </S.CardContainer>
      <S.CardContainer> <CustomSkeleton width='8rem' height="2rem" style={{margin: 3}}/> </S.CardContainer>
      <S.CardContainer> <CustomSkeleton width='8rem' height="2rem" style={{margin: 3}}/> </S.CardContainer>
      <S.CardContainer> <CustomSkeleton width='8rem' height="2rem" style={{margin: 3}}/> </S.CardContainer>
      <S.CardContainer> <CustomSkeleton width='12rem' height="2rem" style={{margin: 3}}/> </S.CardContainer>
  </S.CardWrapper>
  )
}

const Card = ({
date, 
baseUnit, 
quoteUnit,
side,
isSell,
price,
amount,
total,
filled,
cancel
}:CardProps) => {
  return (
    <S.CardWrapper>
      <S.CardSideWrapper isSell={isSell}>
        <span>{side}</span>
      </S.CardSideWrapper>
      <S.CardFlex>
        <S.CardPair>
          <CustomIconToken icon={baseUnit} background="secondaryBackgroundSolid"/>
          <CustomIconToken icon={quoteUnit} background="secondaryBackgroundSolid" size="xsmall"/>
        </S.CardPair>
        <span>{baseUnit}/<strong>{quoteUnit}</strong></span>
      </S.CardFlex>
      <S.CardContainer>
        <span>{date}</span>
      </S.CardContainer>
      <S.CardContainer>
        <span>{price}{quoteUnit}</span>
      </S.CardContainer>
      <S.CardContainer>
        <span>{amount}{baseUnit}</span>
      </S.CardContainer>
      <S.CardContainer>
        <span>{total}{quoteUnit}</span>
      </S.CardContainer>
      <S.CardContainer>
        <span>{filled}%</span>
        <S.CardFilled isSell={isSell}/>
      </S.CardContainer>
      <S.CardContainer>
        <CustomButton title='Cancel' icon={{icon:'Close', size:'xsmall'}} size='Small' onClick={cancel} />
      </S.CardContainer>
  </S.CardWrapper>
  )
}