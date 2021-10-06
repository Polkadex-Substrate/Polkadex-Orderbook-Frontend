import { stat } from "fs";

import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import * as S from "./styles";
import { OrderProps } from "./types";

import { Icon, TabContent, TabHeader, Tabs } from "src/ui/components";
import { AssetInfo } from "src/ui/molecules";
import { Accounts, OrderForm } from "src/ui/organisms";
import {
  selectCurrentMarket,
  selectCurrentMarketFilters,
  selectCurrentPrice,
  selectDepthAsks,
  selectDepthBids,
  selectMarketTickers,
  selectOrderExecuteLoading,
  selectUserLoggedIn,
  selectWallets,
  Wallet,
  walletsFetch,
  setCurrentPrice,
  orderExecuteFetch,
} from "src/modules";
import { useReduxSelector } from "src/hooks";
import { getTotalPrice } from "src/helpers";

export const PlaceOrder = () => {
  const dispatch = useDispatch();
  const currentMarket = useReduxSelector(selectCurrentMarket);
  const currentMarketFilters = useReduxSelector(selectCurrentMarketFilters);
  const asks = useReduxSelector(selectDepthAsks);
  const bids = useReduxSelector(selectDepthBids);
  const marketTickers = useReduxSelector(selectMarketTickers);
  const currentPrice = useReduxSelector(selectCurrentPrice);
  const userLoggedIn = useReduxSelector(selectUserLoggedIn);
  const executeLoading = useReduxSelector(selectOrderExecuteLoading);
  const wallets = useReduxSelector(selectWallets);
  const [state, setState] = useState({
    orderSide: "buy",
    priceLimit: undefined,
    amount: "",
  });

  const getWallet = (currency: string, wallets: Wallet[]) =>
    wallets.find((w) => w.currency === currency.toLowerCase()) as Wallet;

  // Create Order
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
  const handleChangeOrderType = (label: "buy" | "sell") =>
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
  const getAvailableValue = (wallet: Wallet | undefined) => wallet?.balance || 0;

  const walletBase = getWallet(currentMarket?.base_unit, wallets);
  const walletQuote = getWallet(currentMarket?.quote_unit, wallets);

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
            <S.TabHeader> Buy</S.TabHeader>
          </TabHeader>
          <TabHeader>
            <S.TabHeader isSell={true}> Sell </S.TabHeader>
          </TabHeader>
        </S.Header>
        <S.Content>
          <TabContent>
            <OrderForm
              side="buy"
              quoteUnit={currentMarket?.quote_unit.toUpperCase()}
              baseUnit={currentMarket?.base_unit.toUpperCase()}
              availableQuoteAmount={getAvailableValue(walletQuote)}
              availableBaseAmount={getAvailableValue(walletBase)}
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
              side="sell"
              quoteUnit={currentMarket?.quote_unit.toUpperCase()}
              baseUnit={currentMarket?.base_unit.toUpperCase()}
              availableQuoteAmount={getAvailableValue(walletQuote)}
              availableBaseAmount={getAvailableValue(walletBase)}
              priceMarket={currentTicker?.last}
              currentMarketAskPrecision={currentMarket?.amount_precision}
              currentMarketBidPrecision={currentMarket?.price_precision}
              totalPrice={getTotalPrice(state.amount, currentTicker?.last, asks)}
              listenInputPrice={listenInputPrice}
              priceLimit={state.priceLimit}
            />
          </TabContent>
        </S.Content>
        <S.Footer>
          <Accounts/>
        </S.Footer>
      </Tabs>
    </S.Wrapper>
  );
};
