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
import { orderExecuteFetch } from "@polkadex/orderbook-modules";
import { cleanPositiveFloatInput, precisionRegExp, toCapitalize } from "@polkadex/web-helpers";
import { OrderType } from "@polkadex/orderbook/modules/types";

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

  const handleOrders = (e) => {
    e.preventDefault();
    dispatch(
      orderExecuteFetch({
        order_type: state.orderType as OrderType,
        symbol: symbolArray,
        side,
        price: state.price,
        market: `${baseUnit}${quoteUnit}`.toLowerCase(),
        amount: isSellSide ? state.amountSell : state.amountBuy,
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
              value={state.price}
              placeholder="0.00"
              onChange={(e) => handlePriceChange(e.currentTarget.value)}>
              <span>{quoteUnit}</span>
            </SecondaryInput>
            <SecondaryInput
              label="Amount"
              placeholder="0.00"
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
