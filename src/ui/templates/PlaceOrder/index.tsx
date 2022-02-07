// TODO: Check orderExecuteFetch
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import * as S from "./styles";
import { OrderProps } from "./types";

import {
  selectCurrentMarket,
  selectCurrentPrice,
  selectDepthAsks,
  selectMarketTickers,
  selectWallets,
  Wallet,
  setCurrentPrice,
  orderExecuteFetch,
  OrderExecution,
  selectUserBalance,
  Balance,
  selectBestAskPrice,
  selectBestBidPrice,
} from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { Accounts, OrderForm } from "@polkadex/orderbook-ui/organisms";
import { Tabs, TabContent, TabHeader } from "@polkadex/orderbook-ui/molecules";
import { getTotalPrice } from "@polkadex/web-helpers";

export const PlaceOrder = () => {
  const dispatch = useDispatch();
  const currentMarket = useReduxSelector(selectCurrentMarket);
  const asks = useReduxSelector(selectDepthAsks);
  const marketTickers = useReduxSelector(selectMarketTickers);
  const currentPrice = useReduxSelector(selectCurrentPrice);
  const balances = useReduxSelector(selectUserBalance);

  const [state, setState] = useState({
    orderSide: "Buy",
    priceLimit: undefined,
    amount: "",
  });

  // Create Order
  // TODO: Remove if unneeded
  const handleSubmit = (value: OrderProps) => {
    if (!currentMarket) return;
    const { amount, available, orderType, price, type } = value;

    dispatch(setCurrentPrice(0));

    const resultData = {
      market: currentMarket.id,
      side: type,
      volume: amount.toString(),
      ord_type: (orderType as string).toLowerCase(),
    };

    const order =
      orderType === "Limit" ? { ...resultData, price: price.toString() } : resultData;
    let orderAllowed = true;

    if (+resultData.volume < +currentMarket.min_amount) {
      console.log("Min Amount Error.., Push Redux");
      orderAllowed = false;
    }

    if (+price < +currentMarket.min_price) {
      console.log("Min Price Error.., Push Redux");
      orderAllowed = false;
    }

    if (currentMarket.max_price && +price > +currentMarket.max_price) {
      console.log("Max Price Error.., Push Redux");
      orderAllowed = false;
    }

    if (
      (+available < +amount * +price && order.side === "buy") ||
      (+available < +amount && order.side === "sell")
    ) {
      console.log("Order Available Error.., Push Redux");
      orderAllowed = false;
    }

    if (orderAllowed) {
      dispatch(orderExecuteFetch(order));
    }
  };

  // Change order type
  const handleChangeOrderType = (label: "Buy" | "Sell") =>
    setState({ ...state, orderSide: label });

  // Clean Input..
  const listenInputPrice = () => {
    setState({
      ...state,
      priceLimit: undefined,
    });
    dispatch(setCurrentPrice(0));
  };

  // Get available amount
  const getBalance = (assetid: string, balances: Balance[]) => {
    if (balances.length > 0) {
      const idx = balances.findIndex((balance) => balance.ticker === assetid);
      return idx >= 0 ? balances[idx].free : "0";
    } else return "0";
  };
  const [baseAssetId, quoteAssetId] = currentMarket ? currentMarket.symbolArray : [-1, -1];
  const availabeBaseAmount = getBalance(baseAssetId.toString(), balances);
  const availabelQuoteAmount = getBalance(quoteAssetId.toString(), balances);

  const currentTicker = marketTickers[currentMarket?.id];

  useEffect(() => {
    if (currentPrice !== state.priceLimit) setState({ ...state, priceLimit: currentPrice });
  }, [currentPrice, state]);

  return (
    <S.Wrapper>
      <Tabs>
        <h2>Place Order</h2>
        <S.Header>
          <TabHeader>
            <S.TabHeader>Buy</S.TabHeader>
          </TabHeader>
          <TabHeader>
            <S.TabHeader isSell={true}> Sell </S.TabHeader>
          </TabHeader>
        </S.Header>
        {/* TOOD: Place order should only be available if user has signed in */}
        {currentMarket && (
          <S.Content>
            <TabContent>
              <OrderForm
                side="Buy"
                symbolArray={currentMarket.symbolArray}
                quoteUnit={currentMarket?.quote_unit.toUpperCase()}
                baseUnit={currentMarket?.base_unit.toUpperCase()}
                availableQuoteAmount={availabeBaseAmount}
                availableBaseAmount={availabelQuoteAmount}
                priceMarket={currentTicker?.last}
                currentMarketAskPrecision={currentMarket?.amount_precision}
                currentMarketBidPrecision={currentMarket?.price_precision}
                totalPrice={getTotalPrice(state.amount, currentTicker?.last, asks)}
                listenInputPrice={listenInputPrice}
                priceLimit={state.priceLimit}
              />
            </TabContent>
            <TabContent>
              <OrderForm
                side="Sell"
                symbolArray={currentMarket.symbolArray}
                quoteUnit={currentMarket?.quote_unit.toUpperCase()}
                baseUnit={currentMarket?.base_unit.toUpperCase()}
                availableQuoteAmount={availabeBaseAmount}
                availableBaseAmount={availabelQuoteAmount}
                priceMarket={currentTicker?.last}
                currentMarketAskPrecision={currentMarket?.amount_precision}
                currentMarketBidPrecision={currentMarket?.price_precision}
                totalPrice={getTotalPrice(state.amount, currentTicker?.last, asks)}
                listenInputPrice={listenInputPrice}
                priceLimit={state.priceLimit}
              />
            </TabContent>
          </S.Content>
        )}
      </Tabs>
    </S.Wrapper>
  );
};
