"use client";

import { ChangeEvent, useState } from "react";
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

const PRICE = "price";
const AMOUNT = "amount";
const TOTAL = "total";

const initialValues = {
  price: "",
  amount: "",
  total: "",
};

export const SellOrder = ({
  market,
  availableBaseAmount,
}: {
  market?: Market;
  availableBaseAmount: number;
}) => {
  const [validateSubmit, setValidateSubmit] = useState(false);
  const { onToogleConnectTrading } = useSettingsProvider();

  const {
    handleSubmit,
    errors,
    isValid,
    dirty,
    values,
    setValues,
    resetForm,
    isSubmitting,
    touched,
    handleBlur,
    setFieldTouched,
  } = useFormik({
    initialValues,
    validationSchema: limitOrderValidations({
      isSell: true,
      minMarketPrice: market?.minPrice || 0,
      minQuantity: market?.minQty || 0,
      minVolume: market?.minVolume || 0,
      maxVolume: market?.maxVolume || 0,
      availableBalance: availableBaseAmount,
    }),
    validateOnChange: validateSubmit,
    validateOnBlur: true,
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

  return (
    <form
      className="flex flex-auto flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        if (!validateSubmit) setValidateSubmit(true);
        handleSubmit();
      }}
    >
      <Tooltip open={!!errors.price && !!touched.price && isSignedIn}>
        <Tooltip.Trigger asChild>
          <div
            className={classNames(
              "border",
              !!errors.price && isSignedIn
                ? "border-danger-base"
                : "border-transparent"
            )}
          >
            <Input.Primary
              name={PRICE}
              type="text"
              placeholder="0.0000000000"
              autoComplete="off"
              value={values.price}
              onChange={onChange}
              onFocus={(e) => {
                if (!validateSubmit) setValidateSubmit(true);
                handleBlur(e);
              }}
              onBlur={() => setFieldTouched(PRICE, false)}
              className="max-sm:focus:text-[16px]"
            >
              <Input.Label className="w-[50px]">Price</Input.Label>
              <Input.Ticker>{market?.quoteAsset?.ticker}</Input.Ticker>
              <Input.Button variant="increase" onClick={onIncreasePrice} />
              <Input.Button variant="decrease" onClick={onDecreasePrice} />
            </Input.Primary>
          </div>
        </Tooltip.Trigger>
        <Tooltip.Content side="left" className="bg-level-5 z-[2] p-1">
          {errors.price}
        </Tooltip.Content>
      </Tooltip>

      <Tooltip open={!!errors.amount && !!touched.amount && isSignedIn}>
        <Tooltip.Trigger asChild>
          <div
            className={classNames(
              "border",
              !!errors.amount && isSignedIn
                ? "border-danger-base"
                : "border-transparent"
            )}
          >
            <Input.Primary
              type="text"
              name={AMOUNT}
              placeholder="0.0000000000"
              autoComplete="off"
              value={values.amount}
              onChange={onChange}
              onFocus={(e) => {
                if (!validateSubmit) setValidateSubmit(true);
                handleBlur(e);
              }}
              onBlur={() => setFieldTouched(AMOUNT, false)}
              className="max-sm:focus:text-[16px]"
            >
              <Input.Label className="w-[50px]">Amount</Input.Label>
              <Input.Ticker>{market?.baseAsset?.ticker}</Input.Ticker>
              <Input.Button variant="increase" onClick={onIncreaseAmount} />
              <Input.Button variant="decrease" onClick={onDecreaseAmount} />
            </Input.Primary>
          </div>
        </Tooltip.Trigger>
        <Tooltip.Content side="left" className="bg-level-5 z-[2] p-1">
          {errors.amount}
        </Tooltip.Content>
      </Tooltip>
      <div className="flex items-center gap-2 justify-between">
        <TradingFee ticker={market?.quoteAsset.ticker || ""} />
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
      <Tooltip open={!!errors.total && !!touched.total && isSignedIn}>
        <Tooltip.Trigger asChild>
          <div
            className={classNames(
              "border",
              !!errors.total && isSignedIn
                ? "border-danger-base"
                : "border-transparent"
            )}
          >
            <Input.Primary
              type="text"
              name={TOTAL}
              placeholder="0.0000000000"
              autoComplete="off"
              value={values.total}
              onChange={onChange}
              onFocus={(e) => {
                if (!validateSubmit) setValidateSubmit(true);
                handleBlur(e);
              }}
              onBlur={() => setFieldTouched(TOTAL, false)}
              className="max-sm:focus:text-[16px]"
            >
              <Input.Label className="w-[50px]">Total</Input.Label>
              <Input.Ticker>{market?.quoteAsset?.ticker}</Input.Ticker>
              <Input.Button variant="increase" onClick={onIncreaseTotal} />
              <Input.Button variant="decrease" onClick={onDecreaseTotal} />
            </Input.Primary>
          </div>
        </Tooltip.Trigger>
        <Tooltip.Content side="left" className="bg-level-5 z-[2] p-1">
          {errors.total}
        </Tooltip.Content>
      </Tooltip>
      {isSignedIn ? (
        <Button.Solid
          type="submit"
          appearance="danger"
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
