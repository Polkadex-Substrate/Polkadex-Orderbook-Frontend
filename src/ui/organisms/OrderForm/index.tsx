import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import * as S from "./styles";

import {
  Button,
  Skeleton,
  Tabs,
  TabHeader,
  SecondaryInput,
} from "@polkadex/orderbook-ui/molecules";
import { Decimal } from "@polkadex/orderbook-ui/atoms";
import {
  orderExecuteFetch
} from "@polkadex/orderbook-modules";
import { cleanPositiveFloatInput, precisionRegExp, toCapitalize } from "@polkadex/web-helpers";

export const OrderForm = ({
  side,
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
    amountSell: '0.00',
    amountBuy: '0.00',
  });
  const dispatch = useDispatch();

  const isSellSide = side === "sell";
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

  const handleOrders = (e) => {    
    e.preventDefault();    
    dispatch(
      orderExecuteFetch({
        order_type: state.orderType,
        side,
        price: state.price,
        market: `${baseUnit}${quoteUnit}`.toLowerCase(),
        amount: isSellSide? state.amountSell : state.amountBuy
      })
    );
  };
  return (
    <S.Wrapper>
      <Tabs>
        <S.Header>
          <TabHeader>
            <S.TabHeader>Limit</S.TabHeader>
          </TabHeader>
          <TabHeader>
            <S.TabHeader isMarket>Market</S.TabHeader>
          </TabHeader>
        </S.Header>
        <div>
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
            <SecondaryInput
              label="Price"
              value={state.price || "0.00"}
              onChange={(e) => handlePriceChange(e.currentTarget.value)}>
              <span>{isSellSide ? quoteUnit : baseUnit}</span>
            </SecondaryInput>
            <SecondaryInput
              label="Amount"
              value={isSellSide? state.amountSell : state.amountBuy || "0.00"}
              onChange={(e) => handleAmountChange(e.currentTarget.value)}>
              <span>{isSellSide ? baseUnit : quoteUnit}</span>
            </SecondaryInput>
            <SecondaryInput
              value={Decimal.format(
                total,
                currentMarketAskPrecision + currentMarketBidPrecision,
                ","
              )}
              onChange={() => console.log("Updating..")}
              label="Total">
              <span>{isSellSide ? quoteUnit : baseUnit}</span>
            </SecondaryInput>
            <Button
              type="submit"
              color="text"
              size="extraLarge"
              isFull
              onClick={handleOrders}
              background="secondaryBackground">
              {toCapitalize(side)}
            </Button>
          </form>
        </div>
      </Tabs>
    </S.Wrapper>
  );
};
