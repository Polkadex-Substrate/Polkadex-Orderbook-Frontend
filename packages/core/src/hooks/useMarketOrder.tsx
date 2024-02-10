import { useCallback, useMemo } from "react";
import { FormikHelpers } from "formik";
import { useProfile } from "@orderbook/core/providers/user/profile";
import { useOrders } from "@orderbook/core/providers/user/orders";
import {
  cleanPositiveFloatInput,
  decimalPlaces,
  precisionRegExp,
} from "@orderbook/core/helpers";
import { Market } from "@orderbook/core/utils/orderbookService/types";
import { Decimal } from "@orderbook/core/utils";

type FormValues = {
  amount: string;
};

type Props = {
  isSell: boolean;
  market?: Market;
  values: FormValues;
  setValues: FormikHelpers<FormValues>["setValues"];
};

export const useMarketOrder = ({
  isSell,
  market,
  values,
  setValues,
}: Props) => {
  const {
    selectedAddresses: { tradeAddress },
  } = useProfile();
  const { onPlaceOrders } = useOrders();

  const minAmount = useMemo(() => market?.minQty || 0, [market?.minQty]);

  const [qtyPrecision, amountTickSize] = useMemo(() => {
    const qtyStepSize = market?.qty_step_size || 0;
    const qtyPrecision = decimalPlaces(qtyStepSize);
    return [qtyPrecision, qtyStepSize];
  }, [market?.qty_step_size]);

  const onChangeAmount = useCallback(
    (amount: string) => {
      const convertedValue = cleanPositiveFloatInput(amount);
      if (convertedValue.match(precisionRegExp(qtyPrecision || 0))) {
        setValues({
          ...values,
          amount,
        });
      }
    },
    [qtyPrecision, setValues, values]
  );

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

  const onChangeRange = (percent: number, availableBalance: number) => {
    const amount = `${availableBalance * percent * 0.01}`;
    setValues({
      ...values,
      amount: Decimal.format(amount, qtyPrecision),
    });
  };

  // Calls the action for placing order
  const onExecuteOrder = async (amount: string) => {
    if (!market) {
      console.error("No market selected");
      return;
    }
    await onPlaceOrders({
      order_type: "MARKET",
      symbol: [market?.baseAsset?.id, market?.quoteAsset?.id],
      side: isSell ? "Sell" : "Buy",
      price: 0,
      market: market.id,
      amount: Number(amount),
    });
  };

  return {
    isSignedIn: tradeAddress?.length > 0,

    onChangeAmount,
    onChangeRange,
    onIncreaseAmount,
    onDecreaseAmount,
    onExecuteOrder,
  };
};
