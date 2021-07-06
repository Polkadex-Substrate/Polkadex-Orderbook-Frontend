import React from 'react'
import * as S from "./styles";
import {
  selectCurrentMarket,
  selectMarkets,
  selectMarketTickers,
} from 'src/modules';

import { InformationItemProps} from "./types";
import { CustomLogo, CustomSkeleton, Decimal, CustomDropdown, CustomIcon, CustomIconToken } from 'src/components';
import { useReduxSelector } from 'src/hooks';


export const CustomToolbar = () => {
    
  const currentMarket= useReduxSelector(selectCurrentMarket)
  const markets= useReduxSelector(selectMarkets)
  const marketTickers= useReduxSelector(selectMarketTickers)

    const getTickerValue = (value: string) => {
      const defaultTicker = { amount: 0, low: 0, last: 0, high: 0, volume: 0, price_change_percent: '+0.00%'};
      return currentMarket && (marketTickers[currentMarket.id] || defaultTicker)[value];
    };  
    
    const defaultTicker = { amount: 0, low: 0, last: 0, high: 0, volume: 0, price_change_percent: '+0.00%' };
    const bidUnit = currentMarket && currentMarket.quote_unit.toUpperCase();
    const isPositive = currentMarket && /\+/.test(getTickerValue("price_change_percent"));

    return (
      <S.InformationWrapper>
        <S.InformationContainer>
          <CustomLogo />
        </S.InformationContainer>
        <S.InformationContainer>
          <CustomDropdown title={<DropwodnHeader title="ETH/PDEX" icon="ETH"/>} direction="bottom">
            <p>Testing..</p>
          </CustomDropdown>
        </S.InformationContainer>
        <S.InformationContainer>
          <InformationItem
            label="Last price"
            text={currentMarket && `${Decimal.format(Number(getTickerValue('last')), currentMarket.price_precision, ',')} ${bidUnit}`}
          />
          <InformationItem
            label="Price 24h"
            text= {currentMarket && (marketTickers[currentMarket.id] || defaultTicker).price_change_percent}
            color={isPositive ? "green" : "red"}
          />
        <InformationItem
          label="Volumne 24h"
          text={currentMarket && `${Decimal.format(Number(getTickerValue('volume')), currentMarket.price_precision, ',')} ${bidUnit}`}
          /> 
          <S.InformationChangeWrapper>
            <InformationItem
              label="24h high"
              text={currentMarket && `${Decimal.format(Number(getTickerValue('high')), currentMarket.price_precision, ',')} ${bidUnit}`}
              color="green"
              orientation="horizontal"
            />
            <InformationItem
                label="24h low"
                text={currentMarket && `${Decimal.format(Number(getTickerValue('low')), currentMarket.price_precision, ',')} ${bidUnit}`}
                color="red"
                orientation="horizontal"
              />
          </S.InformationChangeWrapper>
        </S.InformationContainer>
    </S.InformationWrapper>
    )
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

const DropwodnHeader = ({title = '', icon = "Default"}) => {
  return (
    <S.DropdownHeader>
      <CustomIconToken icon={icon} size="small"/>
       <span>{title}</span>
      <CustomIcon icon="ArrowBottom" size="xsmall"/>      
    </S.DropdownHeader>
  )
}