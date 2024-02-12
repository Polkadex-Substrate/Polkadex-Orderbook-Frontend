import { useCallback } from "react";
import BigNumber from "bignumber.js";
import { FormikHelpers } from "formik";
import { useProfile } from "@orderbook/core/providers/user/profile";
import { useOrders } from "@orderbook/core/providers/user/orders";
import { Decimal } from "@orderbook/core/utils";
import {
  cleanPositiveFloatInput,
  decimalPlaces,
  formatNumber,
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
  const pricePrecision = market ? decimalPlaces(market.price_tick_size) : 0;
  const qtyPrecision = market ? decimalPlaces(market.qty_step_size) : 0;
  const minAmount = market?.minQty || 0;
  const minPrice = market?.minPrice || 0;
  const amountTickSize = market?.qty_step_size || 0;
  const priceTickSize = market?.price_tick_size || 0;
  const totalPrecision = Math.max(pricePrecision, qtyPrecision);
  const minTotal = 1;
  const totalTickSize = 0.5;

  const {
    currentTicker: { currentPrice: lastPriceValue },
  } = useTickers(market?.id);

  const {
    selectedAddresses: { tradeAddress },
  } = useProfile();

  const { onPlaceOrders } = useOrders();

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
            ? calculateTotal(convertedValue, amount)
            : "";

        setValues({
          ...values,
          price: convertedValue,
          total,
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
          total: total && formatNumber(Decimal.format(total, totalPrecision)),
        });
      }
    },
    [qtyPrecision, calculateTotal, setValues, values, totalPrecision]
  );

  const onChangeTotal = useCallback(
    (total: string) => {
      const price = values.price;
      const convertedValue = cleanPositiveFloatInput(total);
      if (convertedValue.match(precisionRegExp(totalPrecision || 0))) {
        const formPrice = +price || lastPriceValue;

        const estimatedAmount =
          formPrice === 0
            ? ""
            : trimFloat({
                value: Number(total) / formPrice,
                digitsAfterDecimal: qtyPrecision,
              });

        setValues({
          total,
          price: formPrice === 0 ? "" : String(formPrice),
          amount: estimatedAmount === "0" ? "" : estimatedAmount,
        });
      }
    },
    [lastPriceValue, qtyPrecision, setValues, totalPrecision, values.price]
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
        total: formatNumber(Decimal.format(total, totalPrecision)),
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
      total: formatNumber(Decimal.format(total, totalPrecision)),
    });
  };

  const onIncreasePrice = () => {
    let price = values.price;
    if (!price.trim().length) price = String(minPrice);
    else price = String(+values.price + priceTickSize);
    onChangePrice(parseFloat(price).toFixed(pricePrecision));
  };

  const onDecreasePrice = () => {
    let price = values.price;
    if (!price.trim().length || +price <= minPrice) return;
    price = String(+values.price - priceTickSize);
    onChangePrice(parseFloat(price).toFixed(pricePrecision));
  };

  const onIncreaseAmount = () => {
    let amount = values.amount;
    if (!amount.trim().length) amount = String(minAmount);
    else amount = String(+values.amount + amountTickSize);
    onChangeAmount(parseFloat(amount).toFixed(qtyPrecision));
  };

  const onDecreaseAmount = () => {
    let amount = values.amount;
    if (!amount.trim().length || +values.amount <= minAmount) return;
    amount = String(+values.amount - amountTickSize);
    onChangeAmount(parseFloat(amount).toFixed(qtyPrecision));
  };

  const onIncreaseTotal = () => {
    let total = values.total;
    if (!total.trim().length) total = String(minTotal);
    else total = String(+values.total + totalTickSize);
    onChangeTotal(formatNumber(parseFloat(total).toFixed(totalPrecision)));
  };

  const onDecreaseTotal = () => {
    let total = values.total;
    if (!total.trim().length || +values.total <= minTotal) return;
    total = String(+values.total - totalTickSize);
    onChangeTotal(formatNumber(parseFloat(total).toFixed(totalPrecision)));
  };

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

    onIncreasePrice,
    onDecreasePrice,
    onIncreaseAmount,
    onDecreaseAmount,
    onIncreaseTotal,
    onDecreaseTotal,

    onChangeRange,
    onExecuteOrder,
  };
};
