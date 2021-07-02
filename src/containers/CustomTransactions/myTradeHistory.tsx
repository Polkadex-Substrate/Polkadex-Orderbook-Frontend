import React, { useEffect } from 'react'
import { Spinner, Decimal, CustomIcon, CustomSkeleton } from 'src/components'
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { DEFAULT_MARKET } from 'src/constants';
import { localeDate } from 'src/helpers';

import * as S from "./styles"

const timeFrom = String(Math.floor((Date.now() - 1000 * 60 * 60 * 24) / 1000));

import {
  fetchHistory,
  selectCurrentMarket,
  selectCurrentPrice,
  selectHistory,
  selectHistoryLoading,
  setCurrentPrice,
} from 'src/modules';
const handleHighlightValue = (prevValue: string, curValue: string) => {
  let highlighted = '';
  let val = curValue;
  let prev = prevValue;

  while (val !== prev && val.length > 0) {
      highlighted = val[val.length - 1] + highlighted;
      val = val.slice(0, -1);
      prev = prev.slice(0, -1);
  }

  return (
      <React.Fragment>
        {val}{highlighted}
      </React.Fragment>
  );
};


export const MyTradeHistory = () => {
  const dispatch = useDispatch();

  const list = useSelector(selectHistory);
  const fetching = useSelector(selectHistoryLoading);
  const currentMarket = useSelector(selectCurrentMarket) || DEFAULT_MARKET;
  const currentPrice = useSelector(selectCurrentPrice);


  const retrieveData = (item, i) => {
    const { id, created_at, price, amount, taker_type } = item;
    const priceFixed = currentMarket ? currentMarket.price_precision : 0;
    const amountFixed = currentMarket ? currentMarket.amount_precision : 0;
    const higlightedDate = handleHighlightValue(String(localeDate([...list][i - 1] ? [...list][i - 1].created_at : '', 'time')), String(localeDate(created_at, 'time')));
    const orderSide = taker_type === 'buy'

    return (
      <S.CardWrapper key={id} onClick={() => handleOnSelect(i)}>
         <S.CardFlex>
            <CustomIcon icon="Clock" background="transparent" />
            {higlightedDate}
        </S.CardFlex>
        <S.CardFlex>
          <CustomIcon icon={orderSide ? 'ArrowVerticalTop' : 'ArrowVerticalBottom'} background={orderSide ? 'green' : 'primary'} size="xsmall" />
          {taker_type.toUpperCase()}
        </S.CardFlex>
        <div>{Decimal.format(amount, amountFixed, ',')}</div>
        <div>{Decimal.format(price, priceFixed, ',')}</div>
      </S.CardWrapper>
    )
  };

  const renderData = () => {
    return list.length > 0
        ? list.map(retrieveData)
        : [[]];
};

  const handleOnSelect = (index: string) => {
    const priceToSet = list[Number(index)] ? Number(list[Number(index)].price) : 0;

    if (currentPrice !== priceToSet) {
        dispatch(setCurrentPrice(priceToSet));
    }
  };
  
  useEffect(() => {
    dispatch(fetchHistory({
        type: 'trades',
        page: 0,
        time_from: timeFrom,
        market: currentMarket.id,
    }));
  }, [dispatch, currentMarket.id]);
    return (
      <> 
      {list ?  <S.OpenOrders>
        <S.ContentHeader>
            <span>Date</span>
            <span>Side </span>
            <span>Amount </span>
            <span>Price</span>
        </S.ContentHeader>
        {fetching ? <LoadingHistory /> : 
          <S.ContentWrapper>
            {renderData()}
          </S.ContentWrapper>
        }
      </S.OpenOrders> :  <p style={{textAlign: 'center'}}>There is no data to show</p> }
      </>
    )

}

export const LoadingHistory = () => {
  return(
    <S.ContentWrapper >
      <LoadingHistoryItem />
      <LoadingHistoryItem />
      <LoadingHistoryItem />
      <LoadingHistoryItem />
    </S.ContentWrapper>
  )
}
const LoadingHistoryItem = () => {
  return (
    <S.CardWrapper >
    <div> <CustomSkeleton width='14rem' height="2rem" style={{margin: 3}}/> </div>
    <div> <CustomSkeleton width='8rem' height="2rem" style={{margin: 3}} /> </div>
    <div> <CustomSkeleton width='5rem' height="2rem" style={{margin: 3}}/> </div>
    <div> <CustomSkeleton width='8rem' height="2rem" style={{margin: 3}}/> </div>
  </S.CardWrapper>
  )
}