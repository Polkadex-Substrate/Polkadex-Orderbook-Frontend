"use client";

import classNames from "classnames";
import { useFormik } from "formik";
import { Button, Input, Spinner, Tooltip } from "@polkadex/ux";
import { Market } from "@orderbook/core/utils/orderbookService/types";
import { useFunds, useMarketOrder } from "@orderbook/core/hooks";
import { decimalPlaces, trimFloat } from "@orderbook/core/helpers";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import { marketOrderValidations } from "@orderbook/core/validations";

import { Balance } from "./balance";

import { Range } from "@/components/ui/Temp/range";

const AMOUNT = "Amount";

const initialValues = {
  amount: "",
};

export const MarketOrder = ({ market }: { market?: Market }) => {
  const { getFreeProxyBalance } = useFunds();
  const pricePrecision = (market && decimalPlaces(market.price_tick_size)) || 0;
  const qtyPrecision = (market && decimalPlaces(market.qty_step_size)) || 0;

  const availableQuoteAmount = trimFloat({
    value: getFreeProxyBalance(market?.quoteAsset?.id || "-1"),
    digitsAfterDecimal: pricePrecision,
  });

  const availableBaseAmount = trimFloat({
    value: getFreeProxyBalance(market?.baseAsset?.id || "-1"),
    digitsAfterDecimal: qtyPrecision,
  });

  return (
    <div className="flex flex-auto gap-2 flex-wrap">
      <BuyOrder
        market={market}
        availableQuoteAmount={Number(availableQuoteAmount)}
      />
      <SellOrder
        market={market}
        availableBaseAmount={Number(availableBaseAmount)}
      />
    </div>
  );
};

const BuyOrder = ({
  market,
  availableQuoteAmount,
}: {
  market?: Market;
  availableQuoteAmount: number;
}) => {
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
  } = useFormik({
    initialValues,
    validationSchema: marketOrderValidations({
      minQuantity: market?.minQty || 0,
      maxQuantity: market?.maxQty || 0,
      availableBalance: availableQuoteAmount,
    }),
    validateOnChange: true,
    onSubmit: async (e) => {
      try {
        await onExecuteOrder(e.amount);
        resetForm();
      } catch (error) {
        // TODO: Handle this
        console.log(error);
      }
    },
  });
  const { onChangeAmount, onChangeRange, onExecuteOrder, isSignedIn } =
    useMarketOrder({
      isSell: false,
      setValues,
      values,
      market,
    });

  return (
    <form className="flex flex-auto flex-col gap-2" onSubmit={handleSubmit}>
      <Button.Solid
        appearance="secondary"
        className="pointer-events-none opacity-50 border border-dashed py-5"
        size="md"
      >
        Best Market Price
      </Button.Solid>

      <Tooltip open={!!errors.amount && !!values.amount}>
        <Tooltip.Trigger asChild>
          <div
            className={classNames(
              !!errors.amount && !!values.amount && "border-danger-base border"
            )}
          >
            <Input.Primary
              type="text"
              placeholder="0.0000000000"
              autoComplete="off"
              name={AMOUNT}
              value={values.amount}
              onChange={(e) => onChangeAmount(e.target.value)}
            >
              <Input.Label className="w-[50px]">Amount</Input.Label>
              <Input.Ticker>{market?.quoteAsset?.ticker}</Input.Ticker>
              <Input.Button
                variant="increase"
                onClick={() => window.alert("Increase")}
              />
              <Input.Button
                variant="decrease"
                onClick={() => window.alert("Decrease")}
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
      <div className="my-2">
        <Range
          ranges={[
            {
              value: "25%",
              action: () => onChangeRange(25, availableQuoteAmount),
            },
            {
              value: "50%",
              action: () => onChangeRange(50, availableQuoteAmount),
            },
            {
              value: "75%",
              action: () => onChangeRange(75, availableQuoteAmount),
            },
            {
              value: "100%",
              action: () => onChangeRange(100, availableQuoteAmount),
            },
          ]}
        />
      </div>
      {isSignedIn ? (
        <Button.Solid
          type="submit"
          disabled={!(isValid && dirty) || isSubmitting}
          appearance="success"
        >
          {isSubmitting ? (
            <Spinner.Keyboard className="h-6 w-6" />
          ) : (
            <>Buy {market?.baseAsset?.ticker}</>
          )}
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

const SellOrder = ({
  market,
  availableBaseAmount,
}: {
  market?: Market;
  availableBaseAmount: number;
}) => {
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
  } = useFormik({
    initialValues,
    validationSchema: marketOrderValidations({
      minQuantity: market?.minQty || 0,
      maxQuantity: market?.maxQty || 0,
      availableBalance: availableBaseAmount,
    }),
    validateOnChange: true,
    onSubmit: async (e) => {
      try {
        await onExecuteOrder(e.amount);
        resetForm();
      } catch (error) {
        // TODO: Handle this
        console.log(error);
      }
    },
  });
  const { onChangeAmount, onChangeRange, onExecuteOrder, isSignedIn } =
    useMarketOrder({
      isSell: true,
      setValues,
      values,
      market,
    });

  return (
    <form className="flex flex-auto flex-col gap-2" onSubmit={handleSubmit}>
      <Button.Solid
        appearance="secondary"
        className="pointer-events-none opacity-50 border border-dashed py-5"
        size="md"
      >
        Best Market Price
      </Button.Solid>

      <Tooltip open={!!errors.amount && !!values.amount}>
        <Tooltip.Trigger asChild>
          <div
            className={classNames(
              !!errors.amount && !!values.amount && "border-danger-base border"
            )}
          >
            <Input.Primary
              type="text"
              placeholder="0.0000000000"
              autoComplete="off"
              name={AMOUNT}
              value={values.amount}
              onChange={(e) => onChangeAmount(e.target.value)}
            >
              <Input.Label className="w-[50px]">Amount</Input.Label>
              <Input.Ticker>{market?.baseAsset?.ticker}</Input.Ticker>
              <Input.Button
                variant="increase"
                onClick={() => window.alert("Increase")}
              />
              <Input.Button
                variant="decrease"
                onClick={() => window.alert("Decrease")}
              />
            </Input.Primary>
          </div>
        </Tooltip.Trigger>
        <Tooltip.Content side="left" className="bg-level-0 z-[1]">
          {errors.amount}
        </Tooltip.Content>
      </Tooltip>

      <Balance baseTicker={market?.baseAsset?.ticker || ""}>
        {availableBaseAmount}
      </Balance>
      <div className="my-2">
        <Range
          ranges={[
            {
              value: "25%",
              action: () => onChangeRange(25, availableBaseAmount),
            },
            {
              value: "50%",
              action: () => onChangeRange(50, availableBaseAmount),
            },
            {
              value: "75%",
              action: () => onChangeRange(75, availableBaseAmount),
            },
            {
              value: "100%",
              action: () => onChangeRange(100, availableBaseAmount),
            },
          ]}
        />
      </div>
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
          onClick={() => onToogleConnectTrading(true)}
        >
          Connect Wallet
        </Button.Solid>
      )}
    </form>
  );
};
