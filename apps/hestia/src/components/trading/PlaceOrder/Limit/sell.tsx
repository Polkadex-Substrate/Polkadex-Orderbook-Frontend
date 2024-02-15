"use client";

import { ChangeEvent, useEffect } from "react";
import { Button, Input, Tooltip, Spinner } from "@polkadex/ux";
import classNames from "classnames";
import { useFormik } from "formik";
import { useLimitOrder } from "@orderbook/core/hooks";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import { limitOrderValidations } from "@orderbook/core/validations";
import { Market } from "@orderbook/core/utils/orderbookService/types";

import { Balance } from "../balance";

import { Range } from "@/components/ui/Temp/range";
import { TradingFee } from "@/components/ui/ReadyToUse";

const PRICE = "Price";
const AMOUNT = "Amount";
const TOTAL = "Total";

const initialValues = {
  price: "",
  amount: "",
  total: "",
};

export const SellOrder = ({
  market,
  availableBaseAmount,
  currentPrice,
  amount,
}: {
  market?: Market;
  availableBaseAmount: number;
  currentPrice?: number;
  amount: string;
}) => {
  const { onToogleConnectTrading } = useSettingsProvider();

  const {
    touched,
    setFieldValue,
    handleSubmit,
    errors,
    isValid,
    dirty,
    values,
    setValues,
    resetForm,
    isSubmitting,
  } = useFormik({
    initialValues,
    validationSchema: limitOrderValidations({
      isSell: true,
      maxMarketPrice: market?.maxPrice || 0,
      minMarketPrice: market?.minPrice || 0,
      minQuantity: market?.minQty || 0,
      maxQuantity: market?.maxQty || 0,
      availableBalance: availableBaseAmount,
    }),
    onSubmit: async (e) => {
      try {
        await onExecuteOrder(e.price, e.amount);
        resetForm();
      } catch (error) {
        console.log(error);
      }
    },
  });

  const {
    isSignedIn,
    onChangePrice,
    onChangeTotal,
    onChangeAmount,
    onExecuteOrder,
    onChangeRange,
    onIncreasePrice,
    onDecreasePrice,
    onIncreaseAmount,
    onDecreaseAmount,
    onIncreaseTotal,
    onDecreaseTotal,
  } = useLimitOrder({
    isSell: true,
    market,
    values,
    setValues,
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === PRICE) onChangePrice(value);
    else if (name === AMOUNT) onChangeAmount(value);
    else onChangeTotal(value);
  };

  useEffect(() => {
    if (currentPrice) setFieldValue("price", currentPrice);
  }, [setFieldValue, currentPrice]);

  useEffect(() => {
    if (amount) setFieldValue("amount", amount);
  }, [setFieldValue, amount]);

  return (
    <form className="flex flex-auto flex-col gap-2" onSubmit={handleSubmit}>
      <Tooltip
        open={touched.price && !!errors.price && !!values.price && isSignedIn}
      >
        <Tooltip.Trigger asChild>
          <div
            className={classNames(
              !!errors.price &&
                !!values.price &&
                isSignedIn &&
                "border-danger-base border"
            )}
          >
            <Input.Primary
              name={PRICE}
              type="text"
              placeholder="0.0000000000"
              autoComplete="off"
              value={values.price}
              onChange={onChange}
            >
              <Input.Label className="w-[50px]">Price</Input.Label>
              <Input.Ticker>{market?.quoteAsset?.ticker}</Input.Ticker>
              <Input.Button variant="increase" onClick={onIncreasePrice} />
              <Input.Button variant="decrease" onClick={onDecreasePrice} />
            </Input.Primary>
          </div>
        </Tooltip.Trigger>
        <Tooltip.Content side="left" className="bg-level-5 z-[1]">
          {errors.price}
        </Tooltip.Content>
      </Tooltip>

      <Tooltip
        open={
          touched.amount && !!errors.amount && !!values.amount && isSignedIn
        }
      >
        <Tooltip.Trigger asChild>
          <div
            className={classNames(
              !!errors.amount &&
                !!values.amount &&
                isSignedIn &&
                "border-danger-base border"
            )}
          >
            <Input.Primary
              type="text"
              name={AMOUNT}
              placeholder="0.0000000000"
              autoComplete="off"
              value={values.amount}
              onChange={onChange}
            >
              <Input.Label className="w-[50px]">Amount</Input.Label>
              <Input.Ticker>{market?.baseAsset?.ticker}</Input.Ticker>
              <Input.Button variant="increase" onClick={onIncreaseAmount} />
              <Input.Button variant="decrease" onClick={onDecreaseAmount} />
            </Input.Primary>
          </div>
        </Tooltip.Trigger>
        <Tooltip.Content side="left" className="bg-level-5 z-[1]">
          {errors.amount}
        </Tooltip.Content>
      </Tooltip>
      <div className="flex items-center gap-2 justify-between">
        <TradingFee ticker="PDEX" />
        <Balance baseTicker={market?.baseAsset?.ticker || ""}>
          {availableBaseAmount}
        </Balance>
      </div>

      <Range
        ranges={[
          {
            value: "25%",
            action: () => onChangeRange(25, availableBaseAmount, true),
          },
          {
            value: "50%",
            action: () => onChangeRange(50, availableBaseAmount, true),
          },
          {
            value: "75%",
            action: () => onChangeRange(75, availableBaseAmount, true),
          },
          {
            value: "100%",
            action: () => onChangeRange(100, availableBaseAmount, true),
          },
        ]}
      />
      <Tooltip open={!!errors.total && !!values.total && isSignedIn}>
        <Tooltip.Trigger asChild>
          <div
            className={classNames(
              !!errors.total &&
                !!values.total &&
                isSignedIn &&
                "border-danger-base border"
            )}
          >
            <Input.Primary
              type="text"
              name={TOTAL}
              placeholder="0.0000000000"
              autoComplete="off"
              value={values.total}
              onChange={onChange}
            >
              <Input.Label className="w-[50px]">Total</Input.Label>
              <Input.Ticker>{market?.quoteAsset?.ticker}</Input.Ticker>
              <Input.Button variant="increase" onClick={onIncreaseTotal} />
              <Input.Button variant="decrease" onClick={onDecreaseTotal} />
            </Input.Primary>
          </div>
        </Tooltip.Trigger>
        <Tooltip.Content side="right" className="bg-level-5 z-[1]">
          {errors.total}
        </Tooltip.Content>
      </Tooltip>
      {isSignedIn ? (
        <Button.Solid
          type="submit"
          disabled={!(isValid && dirty) || isSubmitting}
        >
          {isSubmitting ? (
            <Spinner.Keyboard className="h-6 w-6" />
          ) : (
            <>Sell {market?.baseAsset?.ticker}</>
          )}
        </Button.Solid>
      ) : (
        <Button.Solid
          type="button"
          appearance="secondary"
          onClick={() => onToogleConnectTrading(true)}
        >
          Connect Trading Account
        </Button.Solid>
      )}
    </form>
  );
};