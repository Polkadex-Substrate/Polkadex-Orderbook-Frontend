import { useDispatch } from "react-redux";
import { useEffect, useState, useCallback, useMemo } from "react";

import { getSymbolFromId } from "../helpers";

import { cleanPositiveFloatInput, precisionRegExp } from "@polkadex/web-helpers";
import {
  selectCurrentMarket,
  selectCurrentPrice,
  selectCurrentMarketTickers,
  setCurrentPrice,
  selectUserBalance,
  selectBestAskPrice,
  selectBestBidPrice,
  orderExecuteFetch,
  selectOrderExecuteLoading,
  selectHasUser,
  selectOrderExecuteSucess,
  selectGetFreeProxyBalance,
} from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { Decimal } from "@polkadex/orderbook-ui/atoms";

export function usePlaceOrder(isSell: boolean, isLimit: boolean) {
  const dispatch = useDispatch();

  const currentMarket = useReduxSelector(selectCurrentMarket);
  const currentTicker = useReduxSelector(selectCurrentMarketTickers);
  const currentPrice = useReduxSelector(selectCurrentPrice);
  const bestAskPrice = useReduxSelector(selectBestAskPrice);
  const bestBidPrice = useReduxSelector(selectBestBidPrice);
  const isOrderLoading = useReduxSelector(selectOrderExecuteLoading);
  const isOrderExecuted = useReduxSelector(selectOrderExecuteSucess);
  const hasUser = useReduxSelector(selectHasUser);
  const getFreeProxyBalance = useReduxSelector(selectGetFreeProxyBalance);

  const [tab, setTab] = useState({
    priceLimit: undefined,
  });
  const initialValue = {
    orderType: isLimit ? "Limit" : "Market",
    price: "",
    priceMarket: currentTicker?.last || 0,
    amountSell: "",
    amountBuy: "",
  };

  const [form, setForm] = useState(initialValue);
  const [rangeValue, setRangeValue] = useState([1]);
  const [changeTypeIsRange, setChangeType] = useState(false);

  const [estimatedTotal, setEstimatedTotal] = useState({ buy: 0, sell: 0 });
  const [baseAssetId, quoteAssetId] = currentMarket ? currentMarket?.assetIdArray : [-1, -1];
  const nextPriceLimitTruncated = Decimal.format(
    tab.priceLimit,
    currentMarket?.price_precision || 0
  );

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
        currentMarket?.amount_precision || 0 + currentMarket?.price_precision || 0,
        ","
      ),
    [currentMarket?.amount_precision, currentMarket?.price_precision]
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
    dispatch(setCurrentPrice(0));
  }, [dispatch, setTab, tab]);

  /**
   * @description Change Price
   *
   * @param {number} price - The price to set
   * @returns {void} Dispatch setCurrentPrice action
   */
  const handlePriceChange = useCallback(
    (price: string): void => {
      const convertedValue = cleanPositiveFloatInput(price?.toString());
      if (convertedValue?.match(precisionRegExp(currentMarket?.amount_precision || 0))) {
        setForm({
          ...form,
          price: convertedValue,
        });
      }
      setChangeType(false);
      handleCleanPrice && handleCleanPrice();
    },

    [currentMarket?.amount_precision, form, handleCleanPrice]
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
      if (convertedValue.match(precisionRegExp(currentMarket?.price_precision || 0))) {
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
    [currentMarket?.price_precision, form, isSell, bestBidPrice, bestAskPrice]
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
    dispatch(
      orderExecuteFetch({
        order_type: isLimit ? "LIMIT" : "MARKET",
        symbol: currentMarket.assetIdArray,
        side: isSell ? "Sell" : "Buy",
        price: isLimit ? form.price : "",
        market: currentMarket.id,
        amount: isSell ? form.amountSell : form.amountBuy,
      })
    );
    setForm({ ...initialValue });
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
        isOrderLoading || !amountInput || amountAvailable || !amountUnavailable || !hasUser
      );
    } else {
      return (
        isOrderLoading ||
        !amountInput ||
        !Number(form.price) ||
        amountAvailable ||
        !amountUnavailable ||
        !hasUser
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
    hasUser,
  ]);

  const calculateTotal = () => {
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
  };

  /**
   * @description Memorize the total amount to buy/sell based on the amount and price
   *
   * @returns {string} total amount result
   */
  const total = useMemo(() => {
    return form.amountSell || form.amountBuy ? getEstimatedTotal(calculateTotal()) : "";
  }, [
    isSell,
    isLimit,
    estimatedTotal,
    form.amountBuy,
    form.amountSell,
    form.price,
    getEstimatedTotal,
    rangeValue,
  ]);

  const updateRange = useCallback(
    (data: { values: Array<number> }) => {
      setRangeValue(data.values);
      setChangeType(true);
      // limit and sell
      if (isLimit && isSell) {
        if (Number(availableBaseAmount) && Number(form.price)) {
          form.amountSell = `${Number(availableBaseAmount) * Number(data.values[0]) * 0.01}`;
        }
      }
      // limit and buy
      else if (isLimit && !isSell) {
        if (Number(availableQuoteAmount) && Number(form.price)) {
          form.amountBuy = `${
            (Number(availableQuoteAmount) * Number(data.values[0]) * 0.01) / Number(form.price)
          }`;
        }
      }
      // market and sell
      else if (!isLimit && isSell) {
        if (Number(availableBaseAmount) && Number(bestBidPrice)) {
          form.amountSell = `${Number(availableBaseAmount) * Number(data.values[0]) * 0.01}`;
        }
      }
      // market and buy
      else {
        if (Number(availableQuoteAmount) && Number(bestAskPrice)) {
          form.amountBuy = `${Number(availableQuoteAmount) * Number(data.values[0]) * 0.01}`;
        }
      }
    },
    [rangeValue, total, isSell, isLimit, form.price, form.amountBuy, form.amountSell]
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
    currentMarket?.price_precision,
    nextPriceLimitTruncated,
    handlePriceChange,
  ]);

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
    orderSide: isSell ? "Sell" : "Buy",
    hasUser,
  };
}
