// TODO: Refactor code
import { useEffect, useState, useCallback, useMemo } from "react";
import { FormikHelpers } from "formik";
// import { useTranslation } from "react-i18next";

import { cleanPositiveFloatInput, decimalPlaces, precisionRegExp } from "../helpers";
import { useBalancesProvider } from "../providers/user/balancesProvider/useBalancesProvider";
import { useMarketsProvider } from "../providers/public/marketsProvider/useMarketsProvider";

import { useTryUnlockTradeAccount } from "./useTryUnlockTradeAccount";

import { Decimal } from "@polkadex/orderbook-ui/atoms";
import { useOrderBook } from "@polkadex/orderbook/providers/public/orderBook";
import { useProfile } from "@polkadex/orderbook/providers/user/profile";
import { useTradeWallet } from "@polkadex/orderbook/providers/user/tradeWallet";
import { selectTradeAccount } from "@polkadex/orderbook/providers/user/tradeWallet/helper";
import { useOrders } from "@polkadex/orderbook/providers/user/orders";
import { useSettingsProvider } from "@polkadex/orderbook/providers/public/settings";

type FormValues = {
  priceSell: string;
  priceBuy: string;
  amountSell: string;
  amountBuy: string;
};

export function usePlaceOrder(
  isSell: boolean,
  isLimit: boolean,
  orderType: "Limit" | "Market",
  formValues: FormValues,
  setFormValues: FormikHelpers<FormValues>["setValues"]
) {
  const {
    depth: { asks, bids },
  } = useOrderBook();

  const { allBrowserAccounts } = useTradeWallet();

  const {
    selectedAccount: { tradeAddress },
    authInfo: { isAuthenticated },
  } = useProfile();

  const {
    currentPrice,
    onSetCurrentPrice,
    onPlaceOrders,
    execute: { isLoading: isOrderLoading, isSuccess: isOrderExecuted },
    // amount: selectedAmountFromOrderbookTable,
  } = useOrders();

  const { currentMarket } = useMarketsProvider();

  const { onHandleError } = useSettingsProvider();

  const { getFreeProxyBalance } = useBalancesProvider();

  // const { t: translation } = useTranslation("molecules");
  // const t = useCallback(
  //   (key: string, args = {}) => translation(`marketOrderAction.${key}`, args),
  //   [translation]
  // );

  // const minAmount = currentMarket?.min_amount;

  const bestAskPrice = asks.length > 0 ? parseFloat(asks[asks.length - 1][0]) : 0;

  const bestBidPrice = bids.length > 0 ? parseFloat(bids[0][0]) : 0;

  const hasTradeAccount = tradeAddress !== "";
  const usingTradeAddress = tradeAddress;

  const tradeAccount = selectTradeAccount(usingTradeAddress, allBrowserAccounts);

  // if account is not protected by password use default password to unlock account.
  useTryUnlockTradeAccount(tradeAccount);

  const showProtectedPassword = tradeAccount?.isLocked;

  const [tab, setTab] = useState({
    priceLimit: undefined,
  });

  const [slider, setSlider] = useState([
    { percentage: "25%", percentageNum: 1, isActive: false },
    { percentage: "50%", percentageNum: 2, isActive: false },
    { percentage: "75%", percentageNum: 3, isActive: false },
    { percentage: "100%", percentageNum: 4, isActive: false },
  ]);

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
    onSetCurrentPrice(0);
  }, [setTab, tab, onSetCurrentPrice]);

  /**
   * @description Change Price
   *
   * @param {number} price - The price to set
   * @returns {void} Dispatch setCurrentPrice action
   */
  const handlePriceChange = useCallback(
    (price: string): void => {
      const name = isSell ? "priceSell" : "priceBuy";
      const convertedValue = cleanPositiveFloatInput(price?.toString());
      if (convertedValue?.match(precisionRegExp(pricePrecision || 0))) {
        setFormValues({
          ...formValues,
          [name]: convertedValue,
        });
      }
      setChangeType(false);
      handleCleanPrice && handleCleanPrice();
    },

    [pricePrecision, handleCleanPrice, setFormValues, formValues, isSell]
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
          setFormValues({
            ...formValues,
            amountSell: convertedValue,
            // error: Number(convertedValue) < minAmount && t("errorMessage", { minAmount }),
          });
        } else {
          setFormValues({
            ...formValues,
            amountBuy: convertedValue,
            // error: Number(convertedValue) < minAmount && t("errorMessage", { minAmount }),
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
    [qtyPrecision, isSell, bestBidPrice, bestAskPrice, setFormValues, formValues]
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
    const amount = isSell ? formValues.amountSell : formValues.amountBuy;
    const notify = (description: string) => onHandleError(`Order Failed. ${description}`);

    const userAvailableBalance = isSell ? availableBaseAmount : availableQuoteAmount;

    const formPrice = isSell ? formValues.priceSell : formValues.priceBuy;

    if (
      isLimit &&
      ((!isSell && +total > +userAvailableBalance) ||
        (isSell && +formValues.amountSell > +userAvailableBalance))
    ) {
      notify("Balance not enough");
    } else if (isLimit && +formPrice < currentMarket.min_price) {
      notify("Price can not be less than min market price");
    } else if (isLimit && +formPrice > currentMarket.max_price) {
      notify("Price can not be greater than max market price");
    } else if (+amount < currentMarket.min_amount) {
      notify("Amount can not be less than min market amount");
    } else if (+amount > currentMarket.max_amount) {
      notify("Amount can not be greater than max market amount");
    } else {
      // VALID TRANSACTION
      onPlaceOrders({
        order_type: isLimit ? "LIMIT" : "MARKET",
        symbol: [currentMarket?.baseAssetId, currentMarket?.quoteAssetId],
        side: isSell ? "Sell" : "Buy",
        price: isLimit ? Number(formPrice) : 0,
        market: currentMarket.id,
        amount: Number(amount),
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
    const amountInput = isSell ? Number(formValues.amountSell) : Number(formValues.amountBuy);

    const formPrice = isSell ? formValues.priceSell : formValues.priceBuy;

    const amountAvailable = isSell
      ? Number(availableBaseAmount) <= 0
      : Number(availableQuoteAmount) <= 0;

    const amountUnavailable = isSell
      ? Number(availableBaseAmount) >=
        Number(formValues.amountSell) * Number(!isLimit ? 1 : formPrice)
      : Number(availableQuoteAmount) >=
        Number(formValues.amountBuy) * Number(!isLimit ? 1 : formPrice);

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
        !Number(formPrice) ||
        amountAvailable ||
        !amountUnavailable ||
        !hasTradeAccount
      );
    }
  }, [
    isOrderLoading,
    formValues,
    isSell,
    availableBaseAmount,
    availableQuoteAmount,
    isLimit,
    hasTradeAccount,
  ]);

  const calculateTotal = useCallback(() => {
    // limit and sell

    const formPrice = isSell ? formValues.priceSell : formValues.priceBuy;

    if (isLimit && isSell) {
      return Number(formValues.amountSell) * Number(formPrice);
    }

    // limit and buy
    else if (isLimit && !isSell) {
      if (changeTypeIsRange) {
        return Number(availableQuoteAmount) * Number(rangeValue[0]) * 0.01;
      }
      return Number(formValues.amountBuy) * Number(formPrice);
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
    formValues,
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
    return formValues.amountSell || formValues.amountBuy
      ? getEstimatedTotal(calculateTotal())
      : "";
  }, [formValues.amountBuy, formValues.amountSell, getEstimatedTotal, calculateTotal]);

  const updateRange = useCallback(
    (data: { values: Array<number> }) => {
      const rangeDecimal = 0.01;
      setRangeValue(data.values);
      setChangeType(true);

      const formPrice = isSell ? formValues.priceSell : formValues.priceBuy;

      // limit and sell
      if (isLimit && isSell) {
        if (Number(availableBaseAmount) && Number(formPrice)) {
          const amount = `${
            Number(availableBaseAmount) * Number(data.values[0]) * rangeDecimal
          }`;
          setFormValues({
            ...formValues,
            amountSell: Decimal.format(amount, qtyPrecision),
            // error: Number(amount) < minAmount && t("errorMessage", { minAmount }),
          });
        }
      }
      // limit and buy
      else if (isLimit && !isSell) {
        if (Number(availableQuoteAmount) && Number(formPrice)) {
          const amount = `${
            (Number(availableQuoteAmount) * Number(data.values[0]) * rangeDecimal) /
            Number(formPrice)
          }`;

          setFormValues({
            ...formValues,
            amountBuy: Decimal.format(amount, qtyPrecision),
            // error: Number(amount) < minAmount && t("errorMessage", { minAmount }),
          });
        }
      }
      // market and sell
      else if (!isLimit && isSell) {
        if (Number(availableBaseAmount) && Number(bestBidPrice)) {
          const amount = `${
            Number(availableBaseAmount) * Number(data.values[0]) * rangeDecimal
          }`;

          setFormValues({
            ...formValues,
            amountSell: Decimal.format(amount, qtyPrecision),
          });
        }
      }
      // market and buy
      else {
        if (Number(availableQuoteAmount) && Number(bestAskPrice)) {
          const amount = `${
            Number(availableQuoteAmount) * Number(data.values[0]) * rangeDecimal
          }`;
          setFormValues({
            ...formValues,
            amountBuy: Decimal.format(amount, qtyPrecision),
          });
        }
      }
    },
    [
      isLimit,
      isSell,
      availableBaseAmount,
      formValues,
      qtyPrecision,
      availableQuoteAmount,
      bestBidPrice,
      bestAskPrice,
      setFormValues,
    ]
  );

  useEffect(() => {
    // Check if the currentPrice is different from the price in the form
    if (currentPrice !== tab.priceLimit) setTab({ ...tab, priceLimit: currentPrice });
  }, [currentPrice, tab]);

  useEffect(() => {
    // Set estimated total price for the current market
    setEstimatedTotal({
      sell: Number(formValues.amountSell) * Number(bestBidPrice),
      buy: Number(formValues.amountBuy) / Number(bestAskPrice),
    });
  }, [bestAskPrice, bestBidPrice, formValues.amountSell, formValues.amountBuy]);

  useEffect(() => {
    const formPrice = isSell ? formValues.priceSell : formValues.priceBuy;

    // Change Price if has price, the price is form is different of selected price, and the form type is Limit
    if (orderType === "Limit" && tab.priceLimit && nextPriceLimitTruncated !== formPrice) {
      handlePriceChange(nextPriceLimitTruncated);
    }
  }, [
    tab.priceLimit,
    orderType,
    formValues.priceSell,
    formValues.priceBuy,
    currentMarket?.quote_precision,
    nextPriceLimitTruncated,
    handlePriceChange,
    isSell,
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
    total,
    executeOrder: handleExecuteOrders,
    buttonDisabled: isDisabled,
    isOrderLoading,
    isOrderExecuted,
    quoteTicker,
    baseTicker,
    isSignedIn: isAuthenticated,
    orderSide: isSell ? "Sell" : "Buy",
    hasUser: hasTradeAccount,
    showProtectedPassword: hasTradeAccount && showProtectedPassword,
    slider,
    handleSliderClick,
  };
}
