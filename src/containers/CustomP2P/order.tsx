import React, { Component } from 'react'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CustomButton,
  Decimal,
  CustomDropdown,
  CustomIcon,
  CustomOrderInputPolkadex,
  TabContent,
  TabHeader,
  Tabs,
} from "src/components";
import * as S from "./styles";
import { SellForm } from "./sellForm"
import { BuyForm } from "./buyForm"
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
}

const defaultOrderTypes: DropdownElem[] = [
    'Limit',
    'Market',
];

export type OnSubmitCallback = (order: OrderProps) => void;

export class Order extends React.Component<OrderComponentProps, State> {
  public state = {
    index: 0,
    amountSell: '',
    amountBuy: '',
  };
  render() {

  const {
    availableBase,
    availableQuote,
    disabled,
    priceMarketBuy,
    priceMarketSell,
    priceLimit,
    from,
    to,
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
    } = this.props;
    
    const { amountSell, amountBuy } = this.state;

    return (
      <Tabs>
          <S.Header>
            <S.Navigation>
              <ul>
                <TabHeader>
                  <CustomButton title="Buy" />
                </TabHeader>
                <TabHeader>
                  <CustomButton title="Sell" />
                </TabHeader>
              </ul>
            </S.Navigation>
          </S.Header>
          <S.Content>
            <TabContent>
              <BuyForm 
                type='buy'
                from={from}
                to={to}
                available={availableQuote}
                availableQuote={availableBase}
                priceMarket={priceMarketBuy}
                priceLimit={priceLimit}
                onSubmit={this.props.onSubmit}
                orderTypes={orderTypes || defaultOrderTypes}
                orderTypesIndex={orderTypesIndex || defaultOrderTypes}
                currentMarketAskPrecision={currentMarketAskPrecision}
                currentMarketBidPrecision={currentMarketBidPrecision}
                totalPrice={getTotalPrice(amountBuy, priceMarketBuy, asks)}
                amount={amountBuy}
                listenInputPrice={listenInputPrice}
                handleAmountChange={this.handleAmountChange}
                handleChangeAmountByButton={this.handleChangeAmountByButton}
                currentMarketFilters={currentMarketFilters}
                isMobileDevice={isMobileDevice}
                translate={translate}
                userLoggedIn={userLoggedIn}
              />
            </TabContent>
            <TabContent>
              <SellForm 
                type='sell'
                from={from}
                to={to}
                available={availableBase}
                availableQuote={availableQuote}
                priceMarket={priceMarketSell}
                priceLimit={priceLimit}
                onSubmit={this.props.onSubmit}
                orderTypes={orderTypes || defaultOrderTypes}
                orderTypesIndex={orderTypesIndex || defaultOrderTypes}
                currentMarketAskPrecision={currentMarketAskPrecision}
                currentMarketBidPrecision={currentMarketBidPrecision}
                totalPrice={getTotalPrice(amountSell, priceMarketSell, bids)}
                amount={amountSell}
                listenInputPrice={listenInputPrice}
                handleAmountChange={this.handleAmountChange}
                handleChangeAmountByButton={this.handleChangeAmountByButton}
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

  private handleAmountChange = (amount, type) => {
    if (type === 'sell') {
        this.setState({ amountSell: amount });
    } else {
        this.setState({ amountBuy: amount });
    }
};

private handleChangeAmountByButton = (value, orderType, price, type) => {
    const { bids, asks, availableBase, availableQuote } = this.props;
    const proposals = this.isTypeSell(type) ? bids : asks;
    const available = this.isTypeSell(type) ? availableBase : availableQuote;
    let newAmount = '';

    switch (type) {
        case 'buy':
            switch (orderType) {
                case 'Limit':
                    newAmount = available && +price ? (
                        Decimal.format(available / +price * value, this.props.currentMarketAskPrecision)
                    ) : '';

                    break;
                case 'Market':
                    newAmount = available ? (
                        Decimal.format(getAmount(Number(available), proposals, value), this.props.currentMarketAskPrecision)
                    ) : '';

                    break;
                default:
                    break;
            }
            break;
        case 'sell':
            newAmount = available ? (
                Decimal.format(available * value, this.props.currentMarketAskPrecision)
            ) : '';

            break;
        default:
            break;
    }

    if (type === 'sell') {
        this.setState({ amountSell: newAmount });
    } else {
        this.setState({ amountBuy: newAmount });
    }
  };
  private isTypeSell = (type: string) => type === 'sell';
}



const Form = ({
  children,
  priceMarket,
  amount,
  totalPrice,
  orderType,
  currentMarketBidPrecision,
  currentMarketAskPrecision,
  from,
  price,
  to,
  type,
}) => {
  const [state, setState] = useState({
    orderType: "Limit",
    price: "",
    priceMarket: priceMarket,
    isPriceValid: {
      valid: true,
      priceStep: 0,
    },
    priceFocused: false,
    amountFocused: false,
  });

  const safeAmount = Number(amount) || 0;
  const safePrice = totalPrice / Number(amount) || priceMarket;

  const total =
    orderType === "Market" ? totalPrice : safeAmount * (Number(price) || 0);

  const availablePrecision =
    type === "buy" ? currentMarketBidPrecision : currentMarketAskPrecision;
  const availableCurrency = type === "buy" ? from : to;

  return <form action="">{children}</form>;
};


