import { useEffect, useState } from "react";

import * as S from "./styles";

import { Button, Decimal, Skeleton, TabHeader, Tabs } from "src/ui/components";
import { OrderInput } from "src/ui/molecules";
import { useReduxSelector } from "src/hooks";
import { selectCurrentMarket, selectDepthAsks, selectDepthBids } from "src/modules";
import {
  cleanPositiveFloatInput,
  getAmount,
  precisionRegExp,
  toCapitalize,
} from "src/helpers";
import { useDispatch } from "react-redux";
import { placeOrdersExecute } from "src/modules/user/OrdersTransactions";
import { selectUserInfo } from 'src/modules/user/profile/selectors';
import { selectPolkadotWalletCurrentAccount } from "src/modules/user/polkadotWallet";

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
  ...props
}) => {
  const [state, setState] = useState({
    orderType: "Limit",
    price: "",
    priceMarket: priceMarket,
    amountSell: "0.000000000",
    amountBuy: "0.000000000",
  });
  const dispatch = useDispatch();
  const currentMarket = useReduxSelector(selectCurrentMarket);
  const asks = useReduxSelector(selectDepthAsks);
  const bids = useReduxSelector(selectDepthBids);
  const usersInfo = useReduxSelector(selectUserInfo);
  const mainAccount = useReduxSelector(selectPolkadotWalletCurrentAccount);
  const isSellSide = side === "sell";
  const amount = isSellSide ? state.amountSell : state.amountBuy;
  const safePrice = totalPrice / Number(amount) || state.priceMarket;
  const safeAmount = Number(amount) || 0;

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
      console.log("Updating..");
      handlePriceChange(nextPriceLimitTruncated);
    }
  }, [priceLimit, state.orderType, state.price, currentMarketBidPrecision]);

  const handleOrders = (e) => {
    e.preventDefault();
    dispatch(
    placeOrdersExecute({
      proxyKeyring: usersInfo.keyringPair,
      mainAddress: mainAccount.address, 
      nonce: 0,
      baseAsset: "BTC",
      quoteAsset: "USD",
      ordertype: "LIMIT",
      orderSide: isSellSide ? "ASK": "BID",
      price: 100,
      quantity: 1,
      isSell: isSellSide
    }))
  }
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
            <OrderInput
              label="Price"
              token={isSellSide ? quoteUnit : baseUnit}
              value={state.price || "0.000000000"}
              onChange={(e) => handlePriceChange(e.currentTarget.value)}
            />
            <OrderInput
              label="Amount"
              token={isSellSide ? baseUnit : quoteUnit}
              value={amount || "0.000000000"}
              onChange={(e) => handleAmountChange(e.currentTarget.value)}
            />
            <OrderInput
              value={Decimal.format(
                total,
                currentMarketAskPrecision + currentMarketBidPrecision,
                ","
              )}
              onChange={() => console.log("Updating..")}
              label="Total"
              token={isSellSide ? quoteUnit : baseUnit}
            />
            <Button
              type="submit"
              title={toCapitalize(side)}
              onClick={handleOrders}
              style={{ width: "100%", justifyContent: "center" }}
              background="secondaryBackground"
            />
          </form>
        </div>
      </Tabs>
    </S.Wrapper>
  );
};
