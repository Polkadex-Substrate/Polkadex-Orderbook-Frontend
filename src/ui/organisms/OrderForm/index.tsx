import { useEffect, useMemo, useState } from "react";
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
  selectBestAskPrice,
  selectBestBidPrice,
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
  const [estimatedTotal, setEstimatedTotal] = useState({ buy: 0, sell: 0 });
  const dispatch = useDispatch();
  const bestAskPrice = useReduxSelector(selectBestAskPrice);
  const bestBidPrice = useReduxSelector(selectBestBidPrice);
  const isSellSide = side === "Sell";
  const amount = isSellSide ? state.amountSell : state.amountBuy;

  const total = Number(amount) * Number(state.price) || 0;

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

  const handleAmountChange = (value: string, isSell: boolean) => {
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
    const estPrice = isSell ? bestBidPrice : bestAskPrice;
    setEstimatedTotal((prevState) => {
      return {
        ...prevState,
        [isSell ? "sell" : "buy"]: Number(convertedValue) * Number(estPrice),
      };
    });
  };

  useEffect(() => {
    setEstimatedTotal({
      sell: Number(state.amountSell) * Number(bestBidPrice),
      buy: Number(state.amountBuy) * Number(bestAskPrice),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bestAskPrice, bestBidPrice]);

  useEffect(() => {
    const nextPriceLimitTruncated = Decimal.format(priceLimit, currentMarketBidPrecision);
    if (state.orderType === "Limit" && priceLimit && nextPriceLimitTruncated !== state.price) {
      handlePriceChange(nextPriceLimitTruncated);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceLimit, state.orderType, state.price, currentMarketBidPrecision]);

  const handleOrders = (e, isMarket) => {
    e.preventDefault();
    dispatch(
      orderExecuteFetch({
        order_type: isMarket ? "MARKET" : "LIMIT",
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
              estimatedTotal={estimatedTotal}
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
  estimatedTotal = { buy: 0, sell: 0 },
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
  const estimatedTotalVal = isSellSide ? estimatedTotal.sell : estimatedTotal.buy;
  const amountInput = isSellSide ? Number(state.amountSell) : Number(state.amountBuy);
  const amountAvailable = isSellSide
    ? Number(availableBaseAmount) <= 0
    : Number(availableQuoteAmount) <= 0;

  const amountUnavailable = isSellSide
    ? Number(availableBaseAmount) >= Number(state.amountSell)
    : Number(availableQuoteAmount) >= Number(state.amountBuy) * Number(state.price);

  const isDisabled = useMemo(() => {
    if (isMarket) {
      return isLoading || !amountInput || amountAvailable || !amountUnavailable;
    } else {
      return (
        isLoading ||
        !amountInput ||
        !Number(state.price) ||
        amountAvailable ||
        !amountUnavailable
      );
    }
  }, [isLoading, amountInput, amountAvailable, isMarket, state, amountUnavailable]);

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
        onChange={(e) => handleAmountChange(e.currentTarget.value, isSellSide)}>
        <span>{baseUnit}</span>
      </SecondaryInput>
      <SecondaryInput
        value={Decimal.format(
          isMarket ? estimatedTotalVal : total,
          currentMarketAskPrecision + currentMarketBidPrecision,
          ","
        )}
        onChange={() => console.log("Updating..")}
        label={isMarket ? "Est Total" : "Total"}>
        <span>{quoteUnit}</span>
      </SecondaryInput>
      <Button
        type="submit"
        color="text"
        hoverColor={isSellSide ? "primary" : "green"}
        size="extraLarge"
        isFull
        onClick={(e) => handleOrders(e, isMarket)}
        disabled={isDisabled}
        background={
          amountInput && state.price
            ? isSellSide
              ? "primary"
              : "green"
            : "secondaryBackground"
        }>
        {toCapitalize(side)}
      </Button>
      {orderCreated && <S.Message>Order created successfully</S.Message>}
    </form>
  );
};
