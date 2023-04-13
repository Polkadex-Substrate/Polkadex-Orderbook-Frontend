// TODO: check callbacks
import { useEffect, useState, useCallback, useMemo } from "react";

import { cleanPositiveFloatInput, decimalPlaces, precisionRegExp } from "../helpers";
import { useBalancesProvider } from "../providers/user/balancesProvider/useBalancesProvider";
import { useMarketsProvider } from "../providers/public/marketsProvider/useMarketsProvider";

import { Decimal } from "@polkadex/orderbook-ui/atoms";
import { useOrderBook } from "@polkadex/orderbook/providers/public/orderBook";
import { useProfile } from "@polkadex/orderbook/providers/user/profile";
import { useTradeWallet } from "@polkadex/orderbook/providers/user/tradeWallet";
import { selectTradeAccount } from "@polkadex/orderbook/providers/user/tradeWallet/helper";
import { useOrders } from "@polkadex/orderbook/providers/user/orders";
import { useSettingsProvider } from "@polkadex/orderbook/providers/public/settings";

export function usePlaceOrder(isSell: boolean, isLimit: boolean) {
  const orderBookState = useOrderBook();
  const tradeWalletState = useTradeWallet();
  const profileState = useProfile();
  const ordersState = useOrders();
  const settingsState = useSettingsProvider();

  const { currentMarket, currentTicker } = useMarketsProvider();
  const currentPrice = ordersState.currentPrice;

  const asks = orderBookState.depth.asks;
  const bestAskPrice = asks.length > 0 ? parseFloat(asks[asks.length - 1][0]) : 0;

  const bids = orderBookState.depth.bids;
  const bestBidPrice = bids.length > 0 ? parseFloat(bids[0][0]) : 0;

  const isOrderLoading = ordersState.execute.isLoading;
  const isOrderExecuted = ordersState.execute.isSuccess;
  const hasTradeAccount = profileState.selectedAccount.tradeAddress !== "";
  const isSignedIn = profileState.authInfo.isAuthenticated;
  const { getFreeProxyBalance } = useBalancesProvider();
  const usingTradeAddress = profileState.selectedAccount.tradeAddress;

  const showProtectedPassword = selectTradeAccount(
    usingTradeAddress,
    tradeWalletState.allBrowserAccounts
  )?.isLocked;

  const [tab, setTab] = useState({
    priceLimit: undefined,
  });

  const [form, setForm] = useState<{
    orderType: string;
    price: string;
    priceMarket: any;
    amountSell: string;
    amountBuy: string;
  }>({
    orderType: isLimit ? "Limit" : "Market",
    price: "",
    priceMarket: currentTicker || 0,
    amountSell: "",
    amountBuy: "",
  });

  const [slider, setSlider] = useState([
    { percentage: "25%", percentageNum: 1, isActive: false },
    { percentage: "50%", percentageNum: 2, isActive: false },
    { percentage: "75%", percentageNum: 3, isActive: false },
    { percentage: "100%", percentageNum: 4, isActive: false },
  ]);

  // when type is changed reset form.
  useEffect(() => {
    setForm((e) => ({
      ...e,
      price: "",
      amountSell: "",
      amountBuy: "",
    }));
  }, []);

  const [rangeValue, setRangeValue] = useState([1]);
  const [changeTypeIsRange, setChangeType] = useState(false);

  const [estimatedTotal, setEstimatedTotal] = useState({ buy: 0, sell: 0 });
  const [baseAssetId, quoteAssetId] = currentMarket
    ? [currentMarket?.baseAssetId, currentMarket?.quoteAssetId]
    : [-1, -1];

  const pricePrecision = decimalPlaces(currentMarket?.price_tick_size);
  const qtyPrecision = decimalPlaces(currentMarket?.qty_step_size);

  const nextPriceLimitTruncated = Decimal.format(tab.priceLimit, pricePrecision || 0);

  /**
   * @description Get asset balance for the current market
   *
   * @param {string} assetId - The token id
   * @returns {string} balance amount
   */

  const availableBaseAmount = getFreeProxyBalance(baseAssetId?.toString());
  const availableQuoteAmount = getFreeProxyBalance(quoteAssetId?.toString());
  const quoteTicker = currentMarket?.quote_ticker;
  const baseTicker = currentMarket?.base_ticker;

  /**
   * @description Get estimated total amount
   *
   * @param {number} total - Total amount to calculate
   * @returns {string} balance amount
   */
  const getEstimatedTotal = useCallback(
    (total: number): string =>
      Decimal.format(
        total,
        currentMarket?.base_precision || 0 + currentMarket?.quote_precision || 0,
        ","
      ),
    [currentMarket?.base_precision, currentMarket?.quote_precision]
  );

  /**
   * @description Clean Input
   *
   * @returns {void} Dispatch setCurrentPrice action
   */
  const handleCleanPrice = useCallback((): void => {
    setTab({
      ...tab,
      priceLimit: undefined,
    });
    ordersState.onSetCurrentPrice(0);
  }, [setTab, tab, ordersState]);

  /**
   * @description Change Price
   *
   * @param {number} price - The price to set
   * @returns {void} Dispatch setCurrentPrice action
   */
  const handlePriceChange = useCallback(
    (price: string): void => {
      const convertedValue = cleanPositiveFloatInput(price?.toString());
      if (convertedValue?.match(precisionRegExp(pricePrecision || 0))) {
        setForm({
          ...form,
          price: convertedValue,
        });
      }
      setChangeType(false);
      handleCleanPrice && handleCleanPrice();
    },

    [pricePrecision, form, handleCleanPrice]
  );

  /**
   * @description Change Amount
   *
   * @param {number} amount - The price to set
   * @returns {void} Dispatch setCurrentPrice action
   */
  const handleAmountChange = useCallback(
    (value: string): void => {
      const convertedValue = cleanPositiveFloatInput(value.toString());
      if (convertedValue.match(precisionRegExp(qtyPrecision || 0))) {
        if (isSell) {
          setForm({
            ...form,
            amountSell: convertedValue,
          });
        } else {
          setForm({
            ...form,
            amountBuy: convertedValue,
          });
        }
      }
      setChangeType(false);
      setEstimatedTotal((estimatedTotal) => {
        return {
          ...estimatedTotal,
          [isSell ? "sell" : "buy"]:
            Number(convertedValue) * Number(isSell ? bestBidPrice : bestAskPrice),
        };
      });
    },
    [qtyPrecision, form, isSell, bestBidPrice, bestAskPrice]
  );

  /**
   * @description Execute Order
   *
   * @param {FormHandelr<T>} e - The onChange event
   * @returns {void} Dispatch setCuorderExecuteFetch action
   */
  // TODO: Type form
  const handleExecuteOrders = (e): void => {
    e.preventDefault();
    const amount = isSell ? form.amountSell : form.amountBuy;
    const notify = (description: string) =>
      settingsState.onHandleAlert(`Order Failed ${description}`);

    const userAvailableBalance = isSell ? availableBaseAmount : availableQuoteAmount;

    if (
      isLimit &&
      ((!isSell && +total > +userAvailableBalance) ||
        (isSell && +form.amountSell > +userAvailableBalance))
    ) {
      notify("balance not enough");
    } else if (isLimit && +form.price < currentMarket.min_price) {
      notify("price cannot be less than min market price");
    } else if (isLimit && +form.price > currentMarket.max_price) {
      notify("price cannot be greater than max market price");
    } else if (+amount < currentMarket.min_amount) {
      notify("Amount cannot be less than min market amount");
    } else if (+amount > currentMarket.max_amount) {
      notify("Amount cannot be greater than max market amount");
    } else {
      // VALID TRANSACTION
      ordersState.onPlaceOrders({
        order_type: isLimit ? "LIMIT" : "MARKET",
        symbol: [currentMarket?.baseAssetId, currentMarket?.quoteAssetId],
        side: isSell ? "Sell" : "Buy",
        price: isLimit ? form.price : "",
        market: currentMarket.id,
        amount,
      });
    }
  };

  /**
   * @description Verify is the button should be disabled
   *
   * @returns {boolean}
   */
  // TODO: Check validation
  const isDisabled = useMemo((): boolean => {
    const amountInput = isSell ? Number(form.amountSell) : Number(form.amountBuy);

    const amountAvailable = isSell
      ? Number(availableBaseAmount) <= 0
      : Number(availableQuoteAmount) <= 0;

    const amountUnavailable = isSell
      ? Number(availableBaseAmount) >=
        Number(form.amountSell) * Number(!isLimit ? 1 : form.price)
      : Number(availableQuoteAmount) >=
        Number(form.amountBuy) * Number(!isLimit ? 1 : form.price);

    if (!isLimit) {
      return (
        isOrderLoading ||
        !amountInput ||
        amountAvailable ||
        !amountUnavailable ||
        !hasTradeAccount
      );
    } else {
      return (
        isOrderLoading ||
        !amountInput ||
        !Number(form.price) ||
        amountAvailable ||
        !amountUnavailable ||
        !hasTradeAccount
      );
    }
  }, [
    isOrderLoading,
    form.amountBuy,
    form.amountSell,
    form.price,
    isSell,
    availableBaseAmount,
    availableQuoteAmount,
    isLimit,
    hasTradeAccount,
  ]);

  const calculateTotal = useCallback(() => {
    // limit and sell
    if (isLimit && isSell) {
      return Number(form.amountSell) * Number(form.price);
    }

    // limit and buy
    else if (isLimit && !isSell) {
      if (changeTypeIsRange) {
        return Number(availableQuoteAmount) * Number(rangeValue[0]) * 0.01;
      }
      return Number(form.amountBuy) * Number(form.price);
    }

    // market and sell
    else if (!isLimit && isSell) {
      if (changeTypeIsRange && Number(availableBaseAmount) && Number(bestBidPrice)) {
        return (
          Number(availableBaseAmount) * Number(rangeValue[0]) * 0.01 * Number(bestBidPrice)
        );
      }
      return Number(estimatedTotal.sell) || 0;
    }

    // market and buy
    else {
      if (changeTypeIsRange && Number(availableQuoteAmount) && Number(bestAskPrice)) {
        return (
          (Number(availableQuoteAmount) * Number(rangeValue[0]) * 0.01) / Number(bestAskPrice)
        );
      }
      return Number(estimatedTotal.buy) || 0;
    }
  }, [
    availableBaseAmount,
    availableQuoteAmount,
    bestAskPrice,
    bestBidPrice,
    changeTypeIsRange,
    estimatedTotal?.buy,
    estimatedTotal?.sell,
    form.amountBuy,
    form.amountSell,
    form.price,
    isLimit,
    isSell,
    rangeValue,
  ]);

  /**
   * @description Memorize the total amount to buy/sell based on the amount and price
   *
   * @returns {string} total amount result
   */
  const total = useMemo(() => {
    return form.amountSell || form.amountBuy ? getEstimatedTotal(calculateTotal()) : "";
  }, [form.amountBuy, form.amountSell, getEstimatedTotal, calculateTotal]);

  const updateRange = useCallback(
    (data: { values: Array<number> }) => {
      const range_decimal = 0.01;
      setRangeValue(data.values);
      setChangeType(true);
      // limit and sell
      if (isLimit && isSell) {
        if (Number(availableBaseAmount) && Number(form.price)) {
          const amount = `${
            Number(availableBaseAmount) * Number(data.values[0]) * range_decimal
          }`;
          setForm({
            ...form,
            amountSell: Decimal.format(amount, qtyPrecision),
          });
        }
      }
      // limit and buy
      else if (isLimit && !isSell) {
        if (Number(availableQuoteAmount) && Number(form.price)) {
          const amount = `${
            (Number(availableQuoteAmount) * Number(data.values[0]) * range_decimal) /
            Number(form.price)
          }`;
          setForm({
            ...form,
            amountBuy: Decimal.format(amount, qtyPrecision),
          });
        }
      }
      // market and sell
      else if (!isLimit && isSell) {
        if (Number(availableBaseAmount) && Number(bestBidPrice)) {
          const amount = `${
            Number(availableBaseAmount) * Number(data.values[0]) * range_decimal
          }`;
          setForm({
            ...form,
            amountSell: Decimal.format(amount, qtyPrecision),
          });
        }
      }
      // market and buy
      else {
        if (Number(availableQuoteAmount) && Number(bestAskPrice)) {
          const amount = `${
            Number(availableQuoteAmount) * Number(data.values[0]) * range_decimal
          }`;
          setForm({
            ...form,
            amountBuy: Decimal.format(amount, qtyPrecision),
          });
        }
      }
    },
    [
      isSell,
      isLimit,
      availableBaseAmount,
      availableQuoteAmount,
      bestAskPrice,
      bestBidPrice,
      form,
      qtyPrecision,
    ]
  );

  useEffect(() => {
    // Check if the currentPrice is different from the price in the form
    if (currentPrice !== tab.priceLimit) setTab({ ...tab, priceLimit: currentPrice });
  }, [currentPrice, tab]);

  useEffect(() => {
    // Set estimated total price for the current market
    setEstimatedTotal({
      sell: Number(form.amountSell) * Number(bestBidPrice),
      buy: Number(form.amountBuy) / Number(bestAskPrice),
    });
  }, [bestAskPrice, bestBidPrice, form]);

  useEffect(() => {
    // Change Price if has price, the price is form is different of selected price, and the form type is Limit
    if (
      form.orderType === "Limit" &&
      tab.priceLimit &&
      nextPriceLimitTruncated !== form.price
    ) {
      handlePriceChange(nextPriceLimitTruncated);
    }
  }, [
    tab.priceLimit,
    form.orderType,
    form.price,
    currentMarket?.quote_precision,
    nextPriceLimitTruncated,
    handlePriceChange,
  ]);

  const handleSliderClick = (data: {
    percentage: string;
    percentageNum: number;
    isActive: boolean;
  }) => {
    const newSlider = [...slider].map((slides) => {
      slides.percentageNum === data.percentageNum
        ? (slides.isActive = true)
        : (slides.isActive = false);
      return slides;
    });
    setSlider(newSlider);
    const percentage = data.percentage.split("%")[0];
    updateRange({ values: [+percentage] });
  };

  return {
    availableAmount: isSell ? availableBaseAmount : availableQuoteAmount,
    changeAmount: handleAmountChange,
    changePrice: handlePriceChange,
    updateRange,
    rangeValue,
    price: form.price,
    amount: isSell ? form.amountSell : form.amountBuy,
    total,
    executeOrder: handleExecuteOrders,
    buttonDisabled: isDisabled,
    isOrderLoading,
    isOrderExecuted,
    quoteTicker,
    baseTicker,
    isSignedIn,
    orderSide: isSell ? "Sell" : "Buy",
    hasUser: hasTradeAccount,
    showProtectedPassword: hasTradeAccount && showProtectedPassword,
    slider,
    handleSliderClick,
  };
}
