import React, { Component } from 'react'
import * as S from "./styles"
import {
  CustomButton,
  Decimal,
  CustomDropdown,
  CustomIcon,
  CustomOrderInputPolkadex,
  PercentageButton,
  CustomAmountInputPolkadex
} from "src/components";
import { AMOUNT_PERCENTAGE_ARRAY } from 'src/constants';

import {
  FilterPrice,
  PriceValidation,
  validatePriceStep,
} from 'src/filters';
import { OrderProps } from './order';
import { cleanPositiveFloatInput, precisionRegExp } from 'src/helpers';

type OnSubmitCallback = (order: OrderProps) => void;
type DropdownElem = number | string | React.ReactNode;
type FormType = 'buy' | 'sell';

export interface OrderFormProps {
    /**
     * Price that is applied during total order amount calculation when type is Market
     */
    priceMarket: number;
    /**
     * Price that is applied during total order amount calculation when type is Market
     */
    priceLimit?: number;
    /**
     * Type of form, can be 'buy' or 'cell'
     */
    type: FormType;
    /**
     * Available types of order
     */
    orderTypes: DropdownElem[];
    /**
     * Available types of order without translations
     */
    orderTypesIndex: DropdownElem[];
    /**
     * Additional class name. By default element receives `cr-order` class
     * @default empty
     */
    className?: string;
    /**
     * Name of currency for price field
     */
    from: string;
    /**
     * Name of currency for amount field
     */
    to: string;
    /**
     * Amount of money in a wallet
     */
    available?: number;
    availableQuote?: number;
    /**
     * Precision of amount, total, available, fee value
     */
    currentMarketAskPrecision: number;
    /**
     * Precision of price value
     */
    currentMarketBidPrecision: number;
    /**
     * Whether order is disabled to execute
     */
    disabled?: boolean;
    /**
     * Callback that is called when form is submitted
     */
    onSubmit: OnSubmitCallback;
    /**
     * start handling change price
     */
    listenInputPrice?: () => void;
    totalPrice: number;
    amount: string;
    isMobileDevice?: boolean;
    currentMarketFilters: FilterPrice[];
    handleAmountChange: (amount: string, type: FormType) => void;
    handleChangeAmountByButton: (value: number, orderType: string | React.ReactNode, price: string, type: string) => void;
    translate: (id: string, value?: any) => string;
    userLoggedIn: boolean;
}

interface OrderFormState {
    orderType: string | React.ReactNode;
    price: string;
    priceMarket: number;
    isPriceValid: PriceValidation;
    amountFocused: boolean;
    priceFocused: boolean;
}

export class Form extends React.PureComponent<OrderFormProps, OrderFormState> {
  constructor(props: OrderFormProps) {
    super(props);
    this.state = {
        orderType: 'Limit',
        price: '',
        priceMarket: this.props.priceMarket,
        isPriceValid: {
            valid: true,
            priceStep: 0,
        },
        priceFocused: false,
        amountFocused: false,
    };
}

public componentWillReceiveProps(next: OrderFormProps) {
    const nextPriceLimitTruncated = Decimal.format(next.priceLimit, this.props.currentMarketBidPrecision);

    if (this.state.orderType === 'Limit' && next.priceLimit && nextPriceLimitTruncated !== this.state.price) {
        this.handlePriceChange(nextPriceLimitTruncated);
    }

    if (this.state.priceMarket !== next.priceMarket) {
        this.setState({
            priceMarket: next.priceMarket,
        });
    }

    if (this.props.to !== next.to || this.props.from !== next.from) {
        this.setState({ price: '' });
        this.props.handleAmountChange('', next.type);
    }
}

  render() {
    const {
      type,
      orderTypes,
      className,
      from,
      to,
      available,
      userLoggedIn,
      availableQuote,
      currentMarketAskPrecision,
      currentMarketBidPrecision,
      totalPrice,
      amount,
      isMobileDevice,
      translate,
  } = this.props;
  const {
      orderType,
      price,
      priceMarket,
      isPriceValid,
      priceFocused,
      amountFocused,
  } = this.state;
  const safeAmount = Number(amount) || 0;
  const safePrice = totalPrice / Number(amount) || priceMarket;

  const total = orderType === 'Market'
      ? totalPrice : safeAmount * (Number(price) || 0);

  const marketOrderType = type === 'buy'
  const availablePrecision = marketOrderType ? currentMarketBidPrecision : currentMarketAskPrecision;
  const availableCurrency = marketOrderType ? from : to;

  const priceText = this.props.translate('page.body.trade.header.newOrder.content.price');
  const amountText = this.props.translate('page.body.trade.header.newOrder.content.amount');
  const submitButtonText = translate(`page.body.trade.header.newOrder.content.tabs.${type}`);

    return (
      <form onSubmit={()=> this.handleEnterPress}> 
        <CustomOrderInputPolkadex 
          background="primaryBackground" 
          name={marketOrderType ? 'buy' : 'sell'}
          label={`I will ${marketOrderType ? 'pay' : 'sell'}`}
          placeholder={marketOrderType ? priceText : amountText}
          value={ marketOrderType ? Decimal.format(total, currentMarketAskPrecision + currentMarketBidPrecision, ',') : amount || ''}
          onChange={ (e) => this.handleAmountChange(e.target.value) }
          amount= { available ? Decimal.format(available, availablePrecision, ',') : '' } 
          token={marketOrderType ? from.toUpperCase() : to.toUpperCase()} 
          reset={!marketOrderType ? ()=> this.handleChangeAmountByButton(0) : null}
          >
            { !marketOrderType && userLoggedIn && <S.ActionsPercent>{
              AMOUNT_PERCENTAGE_ARRAY.map((value, index) => 
              <PercentageButton
                  value={value}
                  key={index}
                  onClick={this.handleChangeAmountByButton}
              />)
            }</S.ActionsPercent>}
        </CustomOrderInputPolkadex> 
        <CustomAmountInputPolkadex 
          background="primaryBackground" 
          name="amount" 
          label="Price" 
          from={from.toUpperCase()} 
          to={to.toUpperCase()} 
          value={price || 0.0000000}          
          action={()=> console.log("testing")}
          placeholder={priceText}
          onChange={(e) => this.handlePriceChange(e.target.value)} 
        />

        <CustomOrderInputPolkadex 
          background="primaryBackground" 
          name="receive"
          label="I will receive"
          placeholder='Receive Amount'
          value={marketOrderType ? amount || '' : `${orderType === 'Market' ? '≈' : ''} ${Decimal.format(total, currentMarketBidPrecision + currentMarketAskPrecision, ',')}`} 
          amount={availableQuote ? Decimal.format(availableQuote, currentMarketAskPrecision, ',') : '' }
          disabled 
          readOnly
          token={marketOrderType ? to.toUpperCase() : from.toUpperCase()} 
         >
            {marketOrderType && userLoggedIn && <S.ActionsPercent>{
              AMOUNT_PERCENTAGE_ARRAY.map((value, index) => 
              <PercentageButton
                  value={value}
                  key={index}
                  onClick={this.handleChangeAmountByButton}
              />)
            }</S.ActionsPercent>}
         </CustomOrderInputPolkadex>

        <S.ContentAction>
          <CustomButton 
          title={submitButtonText} 
          type="submit"
          disabled={this.checkButtonIsDisabled()}
          onClick={this.handleSubmit}
          />
        </S.ContentAction>
      </form>
    )
  }


private handleFieldFocus = (field: string | undefined) => {
    const priceText = this.props.translate('page.body.trade.header.newOrder.content.price');
    const amountText = this.props.translate('page.body.trade.header.newOrder.content.amount');

    switch (field) {
        case priceText:
            this.setState(prev => ({
                priceFocused: !prev.priceFocused,
            }));
            this.props.listenInputPrice && this.props.listenInputPrice();
            break;
        case amountText:
            this.setState(prev => ({
                amountFocused: !prev.amountFocused,
            }));
            break;
        default:
            break;
    }
};

private handlePriceChange = (value: string) => {
    const { currentMarketBidPrecision, currentMarketFilters } = this.props;
    const convertedValue = cleanPositiveFloatInput(String(value));

    if (convertedValue.match(precisionRegExp(currentMarketBidPrecision))) {
        this.setState({
            price: convertedValue,
            isPriceValid: validatePriceStep(convertedValue, currentMarketFilters),
        });
    }

    this.props.listenInputPrice && this.props.listenInputPrice();
};

private handleAmountChange = (value: string) => {
    const { currentMarketAskPrecision } = this.props;
    const convertedValue = cleanPositiveFloatInput(String(value));

    if (convertedValue.match(precisionRegExp(currentMarketAskPrecision))) {
        this.props.handleAmountChange(convertedValue, this.props.type);
    }
};

private handleChangeAmountByButton = (value: number) => {
    const { orderType, price } = this.state;

    this.props.handleChangeAmountByButton(value, orderType, price, this.props.type);
};

private handleSubmit = () => {
    const { available, type, amount } = this.props;
    const { price, priceMarket, orderType } = this.state;

    const order = {
        type,
        orderType,
        amount,
        price: orderType === 'Market' ? priceMarket : price,
        available: available || 0,
    };

    this.props.onSubmit(order);
    this.handlePriceChange('');
    this.props.handleAmountChange('', this.props.type);
};
private renderDropdownTitle = () => {
  return <S.DropdownWrapper>
      {this.state.orderType}
  </S.DropdownWrapper>
}
private checkButtonIsDisabled = (): boolean => {
    const { disabled, available, amount, totalPrice } = this.props;
    const { isPriceValid, orderType, priceMarket, price } = this.state;
    const safePrice = totalPrice / Number(amount) || priceMarket;

    const invalidAmount = Number(amount) <= 0;
    const invalidLimitPrice = orderType === 'Limit' && (Number(price) <= 0 || !isPriceValid.valid);
    const invalidMarketPrice = safePrice <= 0 && orderType === 'Market';

    return disabled || !available || invalidAmount || invalidLimitPrice || invalidMarketPrice;
};

private handleEnterPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        this.handleSubmit();
    }
};
}

