import { useEffect, useState, useCallback, useMemo } from "react";
import { FormikErrors, FormikHelpers } from "formik";
import { useTranslation } from "react-i18next";

import {
  cleanPositiveFloatInput,
  decimalPlaces,
  precisionRegExp,
  getAbsoluteNumber,
} from "../helpers";
import { useBalancesProvider } from "../providers/user/balancesProvider/useBalancesProvider";
import { useMarketsProvider } from "../providers/public/marketsProvider/useMarketsProvider";

import { useTryUnlockTradeAccount } from "./useTryUnlockTradeAccount";

import { Decimal } from "@polkadex/orderbook-ui/atoms";
import { useOrderBook } from "@polkadex/orderbook/providers/public/orderBook";
import { useProfile } from "@polkadex/orderbook/providers/user/profile";
import { useTradeWallet } from "@polkadex/orderbook/providers/user/tradeWallet";
import { selectTradeAccount } from "@polkadex/orderbook/providers/user/tradeWallet/helper";
import { useOrders } from "@polkadex/orderbook/providers/user/orders";
import { useRecentTradesProvider } from "@polkadex/orderbook/providers/public/recentTradesProvider";

type FormValues = {
  priceSell: string;
  priceBuy: string;
  amountSell: string;
  amountBuy: string;
  totalBuy: string;
  totalSell: string;
};

export function usePlaceOrder(
  isSell: boolean,
  isLimit: boolean,
  orderType: "Limit" | "Market",
  formValues: FormValues,
  setFormValues: FormikHelpers<FormValues>["setValues"],
  errors: FormikErrors<FormValues>,
  setFormErrors: FormikHelpers<FormValues>["setErrors"]
) {
  const { t: translation } = useTranslation("molecules");
  const t = useCallback(
    (key: string, args = {}) => translation(`marketOrderAction.errors.${key}`, args),
    [translation]
  );

  const {
    depth: { asks, bids },
  } = useOrderBook();

  const { getCurrentTradePrice } = useRecentTradesProvider();
  const lastPriceValue = getCurrentTradePrice();

  const { allBrowserAccounts } = useTradeWallet();

  const {
    selectedAccount: { tradeAddress },
    authInfo: { isAuthenticated },
  } = useProfile();

  const {
    currentPrice,
    onSetCurrentPrice,
    onSetCurrentAmount,
    onPlaceOrders,
    execute: { isLoading: isOrderLoading, isSuccess: isOrderExecuted },
    amount: selectedAmountFromOrderbookTable,
  } = useOrders();

  const { currentMarket } = useMarketsProvider();

  const { getFreeProxyBalance } = useBalancesProvider();

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
    amountLimit: undefined,
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
  const totalPrecision = Math.max(pricePrecision, qtyPrecision);

  const nextPriceLimitTruncated = Decimal.format(tab.priceLimit, pricePrecision || 0);
  const nextAmountLimitTruncated = Decimal.format(tab.amountLimit, qtyPrecision || 0);

  // Get asset balance for the current market
  const availableBaseAmount = getFreeProxyBalance(baseAssetId?.toString());
  const availableQuoteAmount = getFreeProxyBalance(quoteAssetId?.toString());

  const quoteTicker = currentMarket?.quote_ticker;
  const baseTicker = currentMarket?.base_ticker;

  // Get estimated total amount
  const getEstimatedTotal = useCallback(
    (total: number): string =>
      Decimal.format(
        total,
        currentMarket?.base_precision || 0 + currentMarket?.quote_precision || 0,
        ","
      ),
    [currentMarket?.base_precision, currentMarket?.quote_precision]
  );

  // Reset the current price
  const handleCleanPrice = useCallback((): void => {
    setTab({
      ...tab,
      priceLimit: undefined,
    });
    onSetCurrentPrice(0);
  }, [setTab, tab, onSetCurrentPrice]);

  // Reset the current amount
  const handleCleanAmount = useCallback((): void => {
    setTab({
      ...tab,
      amountLimit: undefined,
    });
    onSetCurrentAmount("0");
  }, [setTab, tab, onSetCurrentAmount]);

  // Calculates total by providing price and amount
  const calculateTotal = useCallback(
    (formPrice: string, formAmount: string) => {
      // Limit & Sell
      if (isLimit && isSell) {
        return Number(formAmount) * Number(formPrice);
      }

      // Limit & Buy
      else if (isLimit && !isSell) {
        if (changeTypeIsRange) {
          return Number(availableQuoteAmount) * Number(rangeValue[0]) * 0.01;
        }
        return Number(formAmount) * Number(formPrice);
      }

      // Market & Sell
      else if (!isLimit && isSell) {
        if (changeTypeIsRange && Number(availableBaseAmount) && Number(bestBidPrice)) {
          return (
            Number(availableBaseAmount) * Number(rangeValue[0]) * 0.01 * Number(bestBidPrice)
          );
        }
        return Number(estimatedTotal.sell) || 0;
      }

      // Market & Buy
      else {
        if (changeTypeIsRange && Number(availableQuoteAmount) && Number(bestAskPrice)) {
          return (
            (Number(availableQuoteAmount) * Number(rangeValue[0]) * 0.01) /
            Number(bestAskPrice)
          );
        }
        return Number(estimatedTotal.buy) || 0;
      }
    },
    [
      availableBaseAmount,
      availableQuoteAmount,
      bestAskPrice,
      bestBidPrice,
      changeTypeIsRange,
      estimatedTotal?.buy,
      estimatedTotal?.sell,
      isLimit,
      isSell,
      rangeValue,
    ]
  );

  // Handle change price value in form
  const handlePriceChange = useCallback(
    (price: string): void => {
      const priceType = isSell ? "priceSell" : "priceBuy";
      const totalType = isSell ? "totalSell" : "totalBuy";
      const formAmount = isSell ? formValues.amountSell : formValues.amountBuy;

      const convertedValue = cleanPositiveFloatInput(price?.toString());
      if (convertedValue?.match(precisionRegExp(pricePrecision || 0))) {
        const total =
          formValues.amountSell || formValues.amountBuy
            ? getEstimatedTotal(calculateTotal(convertedValue, formAmount))
            : "";

        setFormValues({
          ...formValues,
          [priceType]: convertedValue,
          [totalType]: Decimal.format(total, totalPrecision),
        });
      }
      setChangeType(false);
      handleCleanPrice && handleCleanPrice();
    },

    [
      pricePrecision,
      handleCleanPrice,
      setFormValues,
      formValues,
      isSell,
      calculateTotal,
      getEstimatedTotal,
      totalPrecision,
    ]
  );

  // Handle change in amount value in form
  const handleAmountChange = useCallback(
    (value: string): void => {
      const totalType = isSell ? "totalSell" : "totalBuy";
      const amountType = isSell ? "amountSell" : "amountBuy";
      const formPrice = isSell ? formValues.priceSell : formValues.priceBuy;

      const convertedValue = cleanPositiveFloatInput(value.toString());
      if (convertedValue.match(precisionRegExp(qtyPrecision || 0))) {
        const total = convertedValue
          ? getEstimatedTotal(calculateTotal(formPrice, convertedValue))
          : "";

        setFormValues({
          ...formValues,
          [amountType]: convertedValue,
          [totalType]: Decimal.format(total, totalPrecision),
        });
      }
      setChangeType(false);
      handleCleanAmount && handleCleanAmount();
      setEstimatedTotal((estimatedTotal) => {
        return {
          ...estimatedTotal,
          [isSell ? "sell" : "buy"]:
            Number(convertedValue) * Number(isSell ? bestBidPrice : bestAskPrice),
        };
      });
    },
    [
      qtyPrecision,
      isSell,
      bestBidPrice,
      bestAskPrice,
      setFormValues,
      formValues,
      handleCleanAmount,
      calculateTotal,
      getEstimatedTotal,
      totalPrecision,
    ]
  );

  // Handle change in total value in form (Applicable for Limit orders only)
  const handleTotalChange = useCallback(
    (value: string): void => {
      const totalType = isSell ? "totalSell" : "totalBuy";
      const priceType = isSell ? "priceSell" : "priceBuy";
      const amountType = isSell ? "amountSell" : "amountBuy";

      const convertedValue = cleanPositiveFloatInput(value);
      if (convertedValue.match(precisionRegExp(totalPrecision || 0))) {
        const formPrice =
          (isSell ? formValues.priceSell : formValues.priceBuy) || lastPriceValue;

        const estimatedAmount = isSell
          ? `${Number(value)}`
          : `${Number(value) / Number(formPrice)}`;
        setFormValues({
          ...formValues,
          [totalType]: value,
          [priceType]: Decimal.format(formPrice, pricePrecision),
          [amountType]: Decimal.format(estimatedAmount, qtyPrecision),
        });
      }
    },
    [
      formValues,
      setFormValues,
      isSell,
      lastPriceValue,
      pricePrecision,
      qtyPrecision,
      totalPrecision,
    ]
  );

  // Calls the action for placing order
  const handleExecuteOrders = (e): void => {
    e.preventDefault();
    const amount = isSell ? formValues.amountSell : formValues.amountBuy;
    const formPrice = isSell ? formValues.priceSell : formValues.priceBuy;

    onPlaceOrders({
      order_type: isLimit ? "LIMIT" : "MARKET",
      symbol: [currentMarket?.baseAssetId, currentMarket?.quoteAssetId],
      side: isSell ? "Sell" : "Buy",
      price: isLimit ? Number(formPrice) : 0,
      market: currentMarket.id,
      amount: Number(amount),
    });
  };

  // Handles the form error for entered amount and price
  const onHandleFormError = useCallback(() => {
    const amount = isSell ? formValues.amountSell : formValues.amountBuy;
    const formPrice = isSell ? formValues.priceSell : formValues.priceBuy;

    const userAvailableBalance = isSell ? availableBaseAmount : availableQuoteAmount;

    const amountType = isSell ? "amountSell" : "amountBuy";
    const priceType = isSell ? "priceSell" : "priceBuy";

    const total = isSell ? formValues.totalSell : formValues.totalBuy;
    const absoluteTotal = getAbsoluteNumber(total);

    if (
      isLimit &&
      ((!isSell && +absoluteTotal > +userAvailableBalance) ||
        (isSell && +formValues.amountSell > +userAvailableBalance))
    ) {
      setFormErrors({ ...errors, [amountType]: t("notEnoughBalance") });
    } else if (isLimit && +formPrice < currentMarket?.min_price) {
      setFormErrors({
        ...errors,
        [priceType]: t("minMarketPrice", { minMarketPrice: currentMarket?.min_price }),
      });
    } else if (isLimit && +formPrice > currentMarket?.max_price) {
      setFormErrors({
        ...errors,
        [priceType]: t("maxMarketPrice", { maxMarketPrice: currentMarket?.max_price }),
      });
    } else if (+amount < currentMarket?.min_amount) {
      setFormErrors({
        ...errors,
        [amountType]: t("minMarketAmount", { minMarketAmount: currentMarket?.min_amount }),
      });
    } else if (+amount > currentMarket?.max_amount) {
      setFormErrors({
        ...errors,
        [amountType]: t("maxMarketAmount", { maxMarketAmount: currentMarket?.max_amount }),
      });
    }
  }, [
    availableBaseAmount,
    availableQuoteAmount,
    currentMarket?.max_amount,
    currentMarket?.max_price,
    currentMarket?.min_amount,
    currentMarket?.min_price,
    formValues,
    isLimit,
    isSell,
    setFormErrors,
    errors,
    t,
  ]);

  // Verify is the button should be disabled : boolean
  const isDisabled = useMemo((): boolean => {
    const amountInput = isSell ? Number(formValues.amountSell) : Number(formValues.amountBuy);
    const formPrice = isSell ? formValues.priceSell : formValues.priceBuy;

    onHandleFormError();

    const amountAvailable = isSell
      ? Number(availableBaseAmount) <= 0
      : Number(availableQuoteAmount) <= 0;

    const amountUnavailable = isSell
      ? Number(availableBaseAmount) >= Number(formValues.amountSell)
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
    onHandleFormError,
  ]);

  const updateRange = useCallback(
    (data: { values: Array<number> }) => {
      const rangeDecimal = 0.01;
      setRangeValue(data.values);
      setChangeType(true);

      const formPrice =
        (isSell ? formValues.priceSell : formValues.priceBuy) || lastPriceValue;

      // Limit & Sell
      if (isLimit && isSell) {
        if (Number(availableBaseAmount) && Number(formPrice)) {
          const amount = `${
            Number(availableBaseAmount) * Number(data.values[0]) * rangeDecimal
          }`;
          const total = getEstimatedTotal(calculateTotal(formPrice, amount));
          setFormValues({
            ...formValues,
            priceSell: formPrice,
            amountSell: Decimal.format(amount, qtyPrecision),
            totalSell: Decimal.format(total, totalPrecision),
          });
        }
      }
      // Limit & Buy
      else if (isLimit && !isSell) {
        if (Number(availableQuoteAmount) && Number(formPrice)) {
          const amount = `${
            (Number(availableQuoteAmount) * Number(data.values[0]) * rangeDecimal) /
            Number(formPrice)
          }`;
          const total = getEstimatedTotal(calculateTotal(formPrice, amount));

          setFormValues({
            ...formValues,
            priceBuy: formPrice,
            amountBuy: Decimal.format(amount, qtyPrecision),
            totalBuy: Decimal.format(total, totalPrecision),
          });
        }
      }
      // Market & Sell
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
      // Market & Buy
      else {
        if (Number(availableQuoteAmount)) {
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
      setFormValues,
      lastPriceValue,
      totalPrecision,
      calculateTotal,
      getEstimatedTotal,
    ]
  );

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

  // Change tab if currentPrice/currentAmount (selected from orderbook table) is different from the current price/amount in the form
  useEffect(() => {
    if (currentPrice !== tab.priceLimit) setTab({ ...tab, priceLimit: currentPrice });

    if (selectedAmountFromOrderbookTable !== tab.amountLimit)
      setTab({ ...tab, amountLimit: selectedAmountFromOrderbookTable });
  }, [currentPrice, tab, selectedAmountFromOrderbookTable]);

  // Set estimated total price for the current market
  useEffect(() => {
    setEstimatedTotal({
      sell: Number(formValues.amountSell) * Number(bestBidPrice),
      buy: Number(formValues.amountBuy) / Number(bestAskPrice),
    });
  }, [bestAskPrice, bestBidPrice, formValues.amountSell, formValues.amountBuy]);

  useEffect(() => {
    const formPrice = isSell ? formValues.priceSell : formValues.priceBuy;
    const formAmount = isSell ? formValues.amountSell : formValues.amountBuy;

    // Change Price if has price, the price is form is different of selected price, and the form type is Limit
    if (orderType === "Limit" && tab.priceLimit && nextPriceLimitTruncated !== formPrice) {
      handlePriceChange(nextPriceLimitTruncated);
    }

    if (
      tab.amountLimit &&
      +nextAmountLimitTruncated &&
      formAmount !== nextAmountLimitTruncated
    ) {
      handleAmountChange(nextAmountLimitTruncated);
    }
  }, [
    tab,
    orderType,
    formValues,
    currentMarket?.quote_precision,
    nextPriceLimitTruncated,
    handlePriceChange,
    handleAmountChange,
    selectedAmountFromOrderbookTable,
    isSell,
    nextAmountLimitTruncated,
  ]);

  return {
    availableAmount: isSell ? availableBaseAmount : availableQuoteAmount,
    changeTotal: handleTotalChange,
    changeAmount: handleAmountChange,
    changePrice: handlePriceChange,
    updateRange,
    rangeValue,
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
    pricePrecision,
  };
}
