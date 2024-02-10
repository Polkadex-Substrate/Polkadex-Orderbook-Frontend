import { useCallback } from "react";
import { FormikHelpers } from "formik";
import { useProfile } from "@orderbook/core/providers/user/profile";
import { useOrders } from "@orderbook/core/providers/user/orders";
import {
  cleanPositiveFloatInput,
  decimalPlaces,
  precisionRegExp,
} from "@orderbook/core/helpers";
import { Market } from "@orderbook/core/utils/orderbookService/types";

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

  const qtyPrecision = market ? decimalPlaces(market.qty_step_size) : 0;

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
    onExecuteOrder,
  };
};
