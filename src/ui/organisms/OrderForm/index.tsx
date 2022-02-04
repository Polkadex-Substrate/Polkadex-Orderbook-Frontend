import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import * as S from "./styles";

import {
  Button,
  Skeleton,
  Tabs,
  TabHeader,
  SecondaryInput,
  TabContent,
} from "@polkadex/orderbook-ui/molecules";
import { Decimal } from "@polkadex/orderbook-ui/atoms";
import {
  orderExecuteFetch,
  selectOrderExecuteLoading,
  selectOrderExecuteSucess,
} from "@polkadex/orderbook-modules";
import { cleanPositiveFloatInput, precisionRegExp, toCapitalize } from "@polkadex/web-helpers";
import { OrderType } from "@polkadex/orderbook/modules/types";
import { useReduxSelector } from "@polkadex/orderbook-hooks";

export const OrderForm = ({
  side,
  symbolArray,
  quoteUnit,
  baseUnit,
  availableQuoteAmount,
  availableBaseAmount,
  priceMarket,
  totalPrice,
  currentMarketAskPrecision,
  currentMarketBidPrecision,
  listenInputPrice,
  priceLimit,
}) => {
  const [state, setState] = useState({
    orderType: "Limit",
    price: "",
    priceMarket: priceMarket,
    amountSell: "",
    amountBuy: "",
  });
  const dispatch = useDispatch();

  const isSellSide = side === "Sell";
  const amount = isSellSide ? state.amountSell : state.amountBuy;

  const total =
    state.orderType === "Market" ? totalPrice : Number(amount) * Number(state.price) || 0;

  const handlePriceChange = (value: string) => {
    const convertedValue = cleanPositiveFloatInput(String(value));
    if (convertedValue.match(precisionRegExp(currentMarketBidPrecision))) {
      setState({
        ...state,
        price: convertedValue,
      });
    }

    listenInputPrice && listenInputPrice();
  };

  const handleAmountChange = (value: string) => {
    const convertedValue = cleanPositiveFloatInput(String(value));
    if (convertedValue.match(precisionRegExp(currentMarketAskPrecision))) {
      if (isSellSide) {
        setState({
          ...state,
          amountSell: convertedValue,
        });
      } else {
        setState({
          ...state,
          amountBuy: convertedValue,
        });
      }
    }
  };

  useEffect(() => {
    const nextPriceLimitTruncated = Decimal.format(priceLimit, currentMarketBidPrecision);
    if (state.orderType === "Limit" && priceLimit && nextPriceLimitTruncated !== state.price) {
      handlePriceChange(nextPriceLimitTruncated);
    }
  }, [priceLimit, state.orderType, state.price, currentMarketBidPrecision]);

  const handleOrders = (e, isMarket) => {
    e.preventDefault();
    dispatch(
      orderExecuteFetch({
        order_type: isMarket ? "Market" : "Limit",
        symbol: symbolArray,
        side,
        price: state.price,
        market: `${baseUnit}${quoteUnit}`.toLowerCase(),
        amount: isSellSide ? state.amountSell : state.amountBuy,
      })
    );
  };
  const orderCreated = useReduxSelector(selectOrderExecuteSucess);
  const isLoading = useReduxSelector(selectOrderExecuteLoading);

  return (
    <S.Wrapper>
      <Tabs>
        <S.Header>
          <TabHeader>
            <S.TabHeader>Limit</S.TabHeader>
          </TabHeader>
          <TabHeader>
            <S.TabHeader>Market</S.TabHeader>
          </TabHeader>
        </S.Header>
        <S.Content>
          <TabContent>
            <MarketType
              availableBaseAmount={availableBaseAmount}
              availableQuoteAmount={availableQuoteAmount}
              baseUnit={baseUnit}
              quoteUnit={quoteUnit}
              isSellSide={isSellSide}
              state={state}
              handlePriceChange={handlePriceChange}
              handleAmountChange={handleAmountChange}
              handleOrders={handleOrders}
              currentMarketAskPrecision={currentMarketAskPrecision}
              currentMarketBidPrecision={currentMarketBidPrecision}
              total={total}
              orderCreated={orderCreated}
              side={side}
              isLoading={isLoading}
            />
          </TabContent>
          <TabContent>
            <MarketType
              isMarket
              availableBaseAmount={availableBaseAmount}
              availableQuoteAmount={availableQuoteAmount}
              baseUnit={baseUnit}
              quoteUnit={quoteUnit}
              isSellSide={isSellSide}
              state={state}
              handlePriceChange={handlePriceChange}
              handleAmountChange={handleAmountChange}
              handleOrders={handleOrders}
              currentMarketAskPrecision={currentMarketAskPrecision}
              currentMarketBidPrecision={currentMarketBidPrecision}
              total={total}
              orderCreated={orderCreated}
              side={side}
              isLoading={isLoading}
            />
          </TabContent>
        </S.Content>
      </Tabs>
    </S.Wrapper>
  );
};
export const MarketType = ({
  isMarket = false,
  availableBaseAmount,
  availableQuoteAmount,
  baseUnit,
  quoteUnit,
  isSellSide,
  state,
  handlePriceChange,
  handleAmountChange,
  handleOrders,
  currentMarketAskPrecision,
  currentMarketBidPrecision,
  total,
  orderCreated,
  side,
  isLoading,
}) => {
  return (
    <form>
      <S.AvailableAmount>
        <span>Available</span>
        {availableBaseAmount || availableQuoteAmount || baseUnit || quoteUnit ? (
          <span>
            {isSellSide ? availableBaseAmount : availableQuoteAmount} &nbsp;
            {isSellSide ? baseUnit : quoteUnit}
          </span>
        ) : (
          <Skeleton width="4rem" />
        )}
      </S.AvailableAmount>
      {!isMarket && (
        <SecondaryInput
          value={state.price}
          placeholder="Price"
          onChange={(e) => handlePriceChange(e.currentTarget.value)}>
          <span>{quoteUnit}</span>
        </SecondaryInput>
      )}

      <SecondaryInput
        placeholder="Amount"
        value={isSellSide ? state.amountSell : state.amountBuy}
        onChange={(e) => handleAmountChange(e.currentTarget.value)}>
        <span>{baseUnit}</span>
      </SecondaryInput>
      <SecondaryInput
        value={Decimal.format(
          total,
          currentMarketAskPrecision + currentMarketBidPrecision,
          ","
        )}
        onChange={() => console.log("Updating..")}
        label="Total">
        <span>{quoteUnit}</span>
      </SecondaryInput>
      <Button
        type="submit"
        color="text"
        size="extraLarge"
        isFull
        onClick={(e) => handleOrders(e, isMarket)}
        disabled={checkIfDisabled(isLoading, state, isSellSide, isMarket)}
        background="secondaryBackground">
        {toCapitalize(side)}
      </Button>
      {orderCreated && <S.Message>Order created successfully</S.Message>}
    </form>
  );
};
const checkIfDisabled = (isLoading, state, isSellSide, isMarket): boolean => {
  if (isMarket) {
    return isLoading || (isSellSide ? !Number(state.amountSell) : !Number(state.amountBuy));
  } else {
    return (
      isLoading ||
      (isSellSide ? !Number(state.amountSell) : !Number(state.amountBuy)) ||
      !Number(state.price)
    );
  }
};
