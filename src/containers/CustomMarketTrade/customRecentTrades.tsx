import React, { useEffect, useMemo, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useIntl } from 'react-intl';
import { CustomSkeleton, Decimal } from 'src/components'
import * as S from "./styles"
import { Props } from "./types"
import {
  Market,
  PublicTrade,
  resetHistory,
  RootState,
  selectCurrentMarket,
  selectCurrentPrice,
  selectMobileDeviceState,
  selectUserLoggedIn,
  setCurrentPrice,
} from 'src/modules';
import { useReduxSelector } from 'src/hooks'
import { recentTradesFetch, selectRecentTradesOfCurrentMarket } from 'src/modules/public/recentTrades';
import { localeDate } from 'src/helpers';

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

export const CustomRecentTrades = () => {
  const dispatch = useDispatch();

  const currentMarket = useReduxSelector(selectCurrentMarket);
  const currentPrice = useReduxSelector(selectCurrentPrice);
  const recentTrades = useReduxSelector(selectRecentTradesOfCurrentMarket);
   
    const renderRow = (item, i) => {
      const { created_at, taker_type, price, amount } = item;
      const priceFixed = currentMarket ? currentMarket.price_precision : 0;
      const amountFixed = currentMarket ? currentMarket.amount_precision : 0;
      const orderSide = taker_type === 'buy'
      const higlightedDate = handleHighlightValue(String(localeDate(recentTrades[i - 1] ? recentTrades[i - 1].created_at : '', 'time')), String(localeDate(created_at, 'time')));
      
      return recentTrades && <Item  key={i} onClick={() => handleOnSelect(i)} time={higlightedDate} amount={Decimal.format(amount, amountFixed, ',')} price={Decimal.format(price, priceFixed, ',')} isSell={orderSide}/>
    };

const renderData = () => {
  return recentTrades.length > 0
        ? recentTrades.map(renderRow)
        : [[]];
}

const handleOnSelect = useCallback((index: string) => {
    const priceToSet = recentTrades[Number(index)] ? Number(recentTrades[Number(index)].price) : 0;

    if (currentPrice !== priceToSet) {
        dispatch(setCurrentPrice(priceToSet));
    }
}, [currentPrice, recentTrades, dispatch]);

  useEffect(() => {
    if (currentMarket) {
        dispatch(recentTradesFetch(currentMarket));
    }
}, [dispatch, currentMarket]);

  useEffect(() => {
    return () => dispatch(resetHistory())
  }, [])

  return (
    <>
      <Header />
      <S.Box>
        {currentMarket && recentTrades ? renderData() : <p>There is no data to show</p>}
      </S.Box>
    </>
  )
}

const Header = () => {
  const { formatMessage } = useIntl();

  const headers = useMemo(() => {
    return {
      time: formatMessage({ id: 'page.body.trade.header.recentTrades.content.time' }),
      amount: formatMessage({ id: 'page.body.trade.header.recentTrades.content.amount' }),
      price: formatMessage({ id: 'page.body.trade.header.recentTrades.content.price' }),
    }
  }, [formatMessage]);
  return (
    <S.HeaderBox>
      <span>{headers.time}</span>      
      <span>{headers.amount}</span>
      <span>{headers.price}</span>
    </S.HeaderBox>
  )
}

const Item = ({time, amount, price, isSell, onClick}:Props) => {
  return (
    <S.ItemWrapper isSell={isSell} role="button" onClick={onClick}>
      {time ? <span>{time}</span> : <CustomSkeleton width="4rem"/>}
       {amount ? <span>{amount}</span> : <CustomSkeleton  width="4rem"/>}
       {price ? <span>{price}</span> : <CustomSkeleton  width="4rem"/>}
    </S.ItemWrapper>
  )
}
