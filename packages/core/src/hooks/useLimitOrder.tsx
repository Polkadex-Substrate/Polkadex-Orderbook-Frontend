import { useCallback } from "react";
import BigNumber from "bignumber.js";
import { FormikHelpers } from "formik";
import { useProfile } from "@orderbook/core/providers/user/profile";
import { useOrders } from "@orderbook/core/providers/user/orders";
import { Decimal } from "@orderbook/core/utils";
import {
  cleanPositiveFloatInput,
  decimalPlaces,
  getAbsoluteNumber,
  precisionRegExp,
  trimFloat,
} from "@orderbook/core/helpers";
import { useTickers } from "@orderbook/core/hooks";
import { Market } from "@orderbook/core/utils/orderbookService/types";

type FormValues = {
  price: string;
  amount: string;
  total: string;
};

type Props = {
  isSell: boolean;
  market?: Market;
  values: FormValues;
  setValues: FormikHelpers<FormValues>["setValues"];
};

export const useLimitOrder = ({ isSell, market, values, setValues }: Props) => {
  const {
    currentTicker: { currentPrice: lastPriceValue },
  } = useTickers(market?.id);

  const {
    selectedAddresses: { tradeAddress },
  } = useProfile();

  const { onPlaceOrders } = useOrders();

  const pricePrecision = market ? decimalPlaces(market.price_tick_size) : 0;
  const qtyPrecision = market ? decimalPlaces(market.qty_step_size) : 0;
  const totalPrecision = Math.max(pricePrecision, qtyPrecision);
  const minAmount = market?.minQty || 0;
  const amountTickSize = market?.qty_step_size || 0;

  // Get estimated total amount
  const getEstimatedTotal = useCallback(
    (total: number | string): string =>
      Decimal.format(
        total,
        market?.basePrecision || market?.quotePrecision || 0,
        ","
      ),
    [market?.basePrecision, market?.quotePrecision]
  );

  const calculateTotal = useCallback((price: string, amount: string) => {
    const bigPrice = new BigNumber(price);
    const bigAmount = new BigNumber(amount);
    return bigPrice.multipliedBy(bigAmount).toFixed();
  }, []);

  const onChangePrice = useCallback(
    (price: string) => {
      const amount = values.amount;
      const convertedValue = cleanPositiveFloatInput(price?.toString());
      if (convertedValue?.match(precisionRegExp(pricePrecision || 0))) {
        const total =
          amount && convertedValue
            ? calculateTotal(convertedValue, amount)?.toString()
            : "";

        setValues({
          ...values,
          price: convertedValue,
          total: total,
        });
      }
    },

    [pricePrecision, calculateTotal, setValues, values]
  );

  const onChangeAmount = useCallback(
    (amount: string) => {
      const price = values.price;
      const convertedValue = cleanPositiveFloatInput(amount);
      if (convertedValue.match(precisionRegExp(qtyPrecision || 0))) {
        const total =
          convertedValue && price ? calculateTotal(price, convertedValue) : "";

        setValues({
          ...values,
          amount: convertedValue,
          total: String(total),
        });
      }
    },
    [qtyPrecision, calculateTotal, setValues, values]
  );

  const onChangeTotal = useCallback(
    (total: string) => {
      const price = values.price;
      const convertedValue = cleanPositiveFloatInput(total);
      if (convertedValue.match(precisionRegExp(totalPrecision || 0))) {
        const formPrice = +price || lastPriceValue;

        const buyOrderAmount =
          formPrice === 0
            ? ""
            : trimFloat({
                value: Number(total) / formPrice,
                digitsAfterDecimal: qtyPrecision,
              });

        const estimatedAmount = isSell ? total : buyOrderAmount;

        setValues({
          total,
          price: String(formPrice),
          amount: estimatedAmount === "0" ? "" : estimatedAmount,
        });
      }
    },
    [
      isSell,
      lastPriceValue,
      qtyPrecision,
      setValues,
      totalPrecision,
      values.price,
    ]
  );

  const onChangeRange = (
    percent: number,
    availableBalance: number,
    isSell?: boolean
  ) => {
    let price = values.price || String(lastPriceValue);
    if (price === "0") price = String(lastPriceValue);
    if (isSell) {
      const amount = `${availableBalance * percent * 0.01}`;
      const total = getAbsoluteNumber(
        getEstimatedTotal(calculateTotal(price, amount))
      );
      setValues({
        ...values,
        price,
        amount: Decimal.format(amount, qtyPrecision),
        total: Decimal.format(total, totalPrecision),
      });
      return;
    }
    const amount = `${(availableBalance * percent * 0.01) / Number(price)}`;
    const total = getAbsoluteNumber(
      getEstimatedTotal(calculateTotal(price, amount))
    );

    setValues({
      ...values,
      price,
      amount: Decimal.format(amount, qtyPrecision),
      total: Decimal.format(total, totalPrecision),
    });
  };

  const onIncreaseAmount = useCallback(() => {
    let amount = values.amount;
    if (!amount.trim().length) {
      amount = String(minAmount);
    } else {
      amount = String(+values.amount + amountTickSize);
    }
    onChangeAmount(parseFloat(amount).toFixed(qtyPrecision));
  }, [amountTickSize, minAmount, onChangeAmount, qtyPrecision, values.amount]);

  const onDecreaseAmount = useCallback(() => {
    let amount = values.amount;
    if (!amount.trim().length || +values.amount <= minAmount) return;
    amount = String(+values.amount - amountTickSize);
    onChangeAmount(parseFloat(amount).toFixed(qtyPrecision));
  }, [amountTickSize, minAmount, onChangeAmount, qtyPrecision, values.amount]);

  // Calls the action for placing order
  const onExecuteOrder = async (price: string, amount: string) => {
    if (!market) {
      console.error("No market selected");
      return;
    }
    await onPlaceOrders({
      order_type: "LIMIT",
      symbol: [market?.baseAsset?.id, market?.quoteAsset?.id],
      side: isSell ? "Sell" : "Buy",
      price: Number(price),
      market: market.id,
      amount: Number(amount),
    });
  };

  return {
    isSignedIn: tradeAddress?.length > 0,

    onChangeAmount,
    onChangePrice,
    onChangeTotal,

    onIncreaseAmount,
    onDecreaseAmount,

    onChangeRange,
    onExecuteOrder,
  };
};
