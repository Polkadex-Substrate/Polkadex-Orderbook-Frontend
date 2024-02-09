"use client";

import { ChangeEvent } from "react";
import { Button, Input, Tooltip } from "@polkadex/ux";
import classNames from "classnames";
import { useFormik } from "formik";
import { useFunds, useLimitOrder } from "@orderbook/core/hooks";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import { limitOrderValidations } from "@orderbook/core/validations";
import { Market } from "@orderbook/core/utils/orderbookService/types";

import { Balance } from "./balance";

import { Range } from "@/components/ui/Temp/range";

const PRICE = "Price";
const AMOUNT = "Amount";
const TOTAL = "Total";

export const LimitOrder = ({ market }: { market?: Market }) => {
  return (
    <div className="flex flex-auto gap-2 flex-wrap">
      <BuyOrder market={market} />
      <SellOrder />
    </div>
  );
};

const BuyOrder = ({ market }: { market?: Market }) => {
  const initialValues = {
    price: "",
    amount: "",
    total: "",
  };

  const { onToogleConnectTrading } = useSettingsProvider();
  const { getFreeProxyBalance } = useFunds();

  const availableQuoteAmount = getFreeProxyBalance(
    market?.quoteAsset?.id || "-1"
  );

  const {
    handleSubmit,
    errors,
    isValid,
    dirty,
    touched,
    values,
    setValues,
    setTouched,
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema: limitOrderValidations({
      maxMarketPrice: market?.maxPrice || 0,
      minMarketPrice: market?.minPrice || 0,
      minQuantity: market?.minQty || 0,
      maxQuantity: market?.maxQty || 0,
      availableBalance: Number(availableQuoteAmount),
    }),
    validateOnChange: true,
    onSubmit: (e) => {
      try {
        onExecuteOrder(e.price, e.amount);
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
    isOrderLoading,
  } = useLimitOrder({
    isSell: false,
    market,
    values,
    setValues,
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setTouched({ ...touched, [name.toLowerCase()]: true });
    if (name === PRICE) onChangePrice(value, values.amount);
    else if (name === AMOUNT) onChangeAmount(value, values.price);
    else onChangeTotal(value, values.price);
  };

  return (
    <form className="flex flex-auto flex-col gap-2" onSubmit={handleSubmit}>
      <Tooltip open={!!errors.price && touched.price}>
        <Tooltip.Trigger asChild>
          <div
            className={classNames(
              !!errors.price && touched.price && "border-danger-base border"
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
              <Input.Button
                variant="decrease"
                onClick={() => window.alert("Decrease")}
              />
              <Input.Button
                variant="increase"
                onClick={() => window.alert("Increase")}
              />
            </Input.Primary>
          </div>
        </Tooltip.Trigger>
        <Tooltip.Content side="left" className="bg-level-5 z-[1]">
          {errors.price}
        </Tooltip.Content>
      </Tooltip>

      <Tooltip open={!!errors.amount && (touched.amount || touched.total)}>
        <Tooltip.Trigger asChild>
          <div
            className={classNames(
              !!errors.amount &&
                (touched.amount || touched.total) &&
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
              <Input.Button
                variant="decrease"
                onClick={() => window.alert("Decrease")}
              />
              <Input.Button
                variant="increase"
                onClick={() => window.alert("Increase")}
              />
            </Input.Primary>
          </div>
        </Tooltip.Trigger>
        <Tooltip.Content side="left" className="bg-level-5 z-[1]">
          {errors.amount}
        </Tooltip.Content>
      </Tooltip>
      <Balance baseTicker={market?.quoteAsset?.ticker || ""}>
        {availableQuoteAmount}
      </Balance>
      <Range
        ranges={[
          { value: "25%", action: () => window.alert("25%") },
          { value: "50%", action: () => window.alert("50%") },
          { value: "75%", action: () => window.alert("75%") },
          { value: "100%", action: () => window.alert("100%") },
        ]}
      />
      <Tooltip open={!!errors.total}>
        <Tooltip.Trigger asChild>
          <div
            className={classNames(
              !!errors.total && "border-danger-base border"
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
              <Input.Button
                variant="decrease"
                onClick={() => window.alert("Decrease")}
              />
              <Input.Button
                variant="increase"
                onClick={() => window.alert("Increase")}
              />
            </Input.Primary>
          </div>
        </Tooltip.Trigger>
        <Tooltip.Content side="left" className="bg-level-5 z-[1]">
          {errors.total}
        </Tooltip.Content>
      </Tooltip>

      {isSignedIn ? (
        <Button.Solid
          appearance="success"
          type="submit"
          disabled={!(isValid && dirty) || isOrderLoading}
        >
          Buy {market?.baseAsset?.ticker}
        </Button.Solid>
      ) : (
        <Button.Solid
          type="button"
          onClick={() => onToogleConnectTrading(true)}
        >
          Connect Wallet
        </Button.Solid>
      )}
    </form>
  );
};

const SellOrder = () => {
  return (
    <form className="flex flex-auto flex-col gap-2">
      <Input.Primary type="text" placeholder="0.0000000000" autoComplete="off">
        <Input.Label className="w-[50px]">Price</Input.Label>
        <Input.Ticker>PDEX</Input.Ticker>
        <Input.Button
          variant="decrease"
          onClick={() => window.alert("Decrease")}
        />
        <Input.Button
          variant="increase"
          onClick={() => window.alert("Increase")}
        />
      </Input.Primary>
      <Input.Primary type="text" placeholder="0.0000000000" autoComplete="off">
        <Input.Label className="w-[50px]">Amount</Input.Label>
        <Input.Ticker>DOT</Input.Ticker>
        <Input.Button
          variant="decrease"
          onClick={() => window.alert("Decrease")}
        />
        <Input.Button
          variant="increase"
          onClick={() => window.alert("Increase")}
        />
      </Input.Primary>
      <Balance baseTicker="DOT">0.00456000</Balance>
      <div>
        <Range
          ranges={[
            { value: "25%", action: () => window.alert("25%") },
            { value: "50%", action: () => window.alert("50%") },
            { value: "75%", action: () => window.alert("75%") },
            { value: "100%", action: () => window.alert("100%") },
          ]}
        />
      </div>
      <Input.Primary type="text" placeholder="0.0000000000" autoComplete="off">
        <Input.Label className="w-[50px]">Total</Input.Label>
        <Input.Ticker>PDEX</Input.Ticker>
        <Input.Button
          variant="decrease"
          onClick={() => window.alert("Decrease")}
        />
        <Input.Button
          variant="increase"
          onClick={() => window.alert("Increase")}
        />
      </Input.Primary>
      <Button.Solid type="submit">Sell PDEX</Button.Solid>
    </form>
  );
};
