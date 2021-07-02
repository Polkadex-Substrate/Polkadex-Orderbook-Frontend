import React from 'react'
import { useState } from "react";
import {
  CustomButton,
  Decimal,
  CustomDropdown,
  TabContent,
  TabHeader,
  Tabs,
} from "src/components";
import * as S from "./styles";
import { Form } from "./form"
import { FilterPrice } from 'src/filters';
import { getAmount, getTotalPrice } from 'src/helpers';

export type FormType = 'buy' | 'sell';

export type DropdownElem = number | string | React.ReactNode;
export interface OrderProps {
  type: FormType;
  orderType: string | React.ReactNode;
  price: number | string;
  amount: number | string;
  available: number;
}

export interface OrderProps {
    type: FormType;
    orderType: string | React.ReactNode;
    price: number | string;
    amount: number | string;
    available: number;
}

export interface OrderComponentProps {
    /**
     * Amount of money in base currency wallet
     */
    availableBase: number;
    /**
     * Amount of money in quote currency wallet
     */
    availableQuote: number;
    /**
     * Callback which is called when a form is submitted
     */
    onSubmit: OnSubmitCallback;
    /**
     * If orderType is 'Market' this value will be used as price for buy tab
     */
    priceMarketBuy: number;
    /**
     * If orderType is 'Market' this value will be used as price for sell tab
     */
    priceMarketSell: number;
    /**
     * If orderType is 'Limit' this value will be used as price
     */
    priceLimit?: number;
    /**
     * Name of currency for price field
     */
    from: string;
    /**
     * Name of currency for amount field
     */
    to: string;
    /**
     * Whether order is disabled to execute
     */
    disabled?: boolean;
    handleSendType?: (index: number, label: string) => void;
    /**
     * Index of tab to switch on
     */
    /**
     * Precision of amount, total, available, fee value
     */
    currentMarketAskPrecision: number;
    /**
     * Precision of price value
     */
    currentMarketBidPrecision: number;
    orderTypes?: DropdownElem[];
    orderTypesIndex?: DropdownElem[];
    /**
     *
     */
    width?: number;
    /**
     * proposals for buy
     */
    bids: string[][];
    /**
     * proposals for sell
     */
    asks: string[][];
    /**
     * start handling change price
     */
    listenInputPrice?: () => void;
    /**
     * default tab index
     */
    defaultTabIndex?: number;
    isMobileDevice?: boolean;
    currentMarketFilters: FilterPrice[];
    translate: (id: string, value?: any) => string;
    userLoggedIn: boolean
}

interface State {
    index: number;
    amountSell: string;
    amountBuy: string;
    type: string | React.ReactNode;
}

const defaultOrderTypes: DropdownElem[] = [
    'Limit',
    'Market',
];

export type OnSubmitCallback = (order: OrderProps) => void;

export const Order = ({
  availableBase,
  availableQuote,
  disabled,
  priceMarketBuy,
  priceMarketSell,
  priceLimit,
  from,
  to,
  onSubmit,
  currentMarketAskPrecision,
  currentMarketBidPrecision,
  orderTypes,
  orderTypesIndex,
  userLoggedIn,
  asks,
  bids,
  currentMarketFilters,
  isMobileDevice,
  listenInputPrice,
  translate,
  }:OrderComponentProps) => {
    const [state, setState] = useState<State>({
      index: 0,
      amountSell: '',
      amountBuy: '',
      type: 'Limit'
    });
    
    const isTypeSell = (type: string) => type === 'sell';

    const handleAmountChange = (amount: string, type: 'sell' | 'buy') => {
      if (type === 'sell') {
          setState({ ...state, amountSell: amount });
      } else {
          setState({...state, amountBuy: amount });
      }
    };

    const handleChangeAmountByButton = (value, orderType, price, type) => {
      const proposals = isTypeSell(type) ? bids : asks;
      const available = isTypeSell(type) ? availableBase : availableQuote;
      let newAmount = '';
  
      switch (type) {
          case 'buy':
              switch (orderType) {
                  case 'Limit':
                      newAmount = available && +price ? (
                          Decimal.format(available / +price * value, currentMarketAskPrecision)
                      ) : '';
  
                      break;
                  case 'Market':
                      newAmount = available ? (
                          Decimal.format(getAmount(Number(available), proposals, value), currentMarketAskPrecision)
                      ) : '';
  
                      break;
                  default:
                      break;
              }
              break;
          case 'sell':
              newAmount = available ? (
                  Decimal.format(available * value, currentMarketAskPrecision)
              ) : '';
  
              break;
          default:
              break;
      }
  
      if (type === 'sell') {
          setState({ ...state, amountSell: newAmount });
      } else {
          setState({ ...state, amountBuy: newAmount });
      }
    };
  
    const handleOrderTypeChange = (index: number) => setState({ ...state, type: orderTypesIndex ? orderTypesIndex[index] : defaultOrderTypes[index] });
  
  return (
    <Tabs>
      <S.Header>
        <S.Navigation>
          <ul>
            <TabHeader>
              <CustomButton title={`Buy ${to}`} />
            </TabHeader>
            <TabHeader>
              <CustomButton title={`Sell ${to}`} />
            </TabHeader>
          </ul>
          <CustomDropdown direction="bottom" isOpacity title={`${state.type === "Limit"  ? "Limit Order" : "Market Order" }`}>
          <S.MarketTypeDropdown>
              <button type="button" onClick={()=> handleOrderTypeChange(0)}>
                Limit Order
              </button>
              <button type="button" onClick={()=> handleOrderTypeChange(1)}>
                Market Order
              </button>  
          </S.MarketTypeDropdown>
        </CustomDropdown>
        </S.Navigation>
      </S.Header>
      <S.Content>
        <TabContent>
          <Form 
            type='buy'
            from={from}
            to={to}
            available={availableQuote}
            availableQuote={availableBase}
            priceMarket={priceMarketBuy}
            priceLimit={priceLimit}
            onSubmit={onSubmit}
            orderTypes={orderTypes || defaultOrderTypes}
            orderTypesIndex={orderTypesIndex || defaultOrderTypes}
            currentMarketAskPrecision={currentMarketAskPrecision}
            currentMarketBidPrecision={currentMarketBidPrecision}
            totalPrice={getTotalPrice(state.amountBuy, priceMarketBuy, asks)}
            amount={state.amountBuy}
            listenInputPrice={listenInputPrice}
            handleAmountChange={handleAmountChange}
            handleChangeAmountByButton={handleChangeAmountByButton}
            currentMarketFilters={currentMarketFilters}
            isMobileDevice={isMobileDevice}
            translate={translate}
            userLoggedIn={userLoggedIn}
          />     
        </TabContent>
        <TabContent>
          <Form 
            type='sell'
            from={from}
            to={to}
            available={availableBase}
            availableQuote={availableQuote}
            priceMarket={priceMarketSell}
            priceLimit={priceLimit}
            onSubmit={onSubmit}
            orderTypes={orderTypes || defaultOrderTypes}
            orderTypesIndex={orderTypesIndex || defaultOrderTypes}
            currentMarketAskPrecision={currentMarketAskPrecision}
            currentMarketBidPrecision={currentMarketBidPrecision}
            totalPrice={getTotalPrice(state.amountSell, priceMarketSell, bids)}
            amount={state.amountSell}
            listenInputPrice={listenInputPrice}
            handleAmountChange={handleAmountChange}
            handleChangeAmountByButton={handleChangeAmountByButton}
            currentMarketFilters={currentMarketFilters}
            isMobileDevice={isMobileDevice}
            translate={translate}
            userLoggedIn={userLoggedIn}
          />
        </TabContent>
      </S.Content>
    </Tabs>
  )
}


