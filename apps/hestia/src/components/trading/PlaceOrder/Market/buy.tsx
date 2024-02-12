"use client";

import classNames from "classnames";
import { useFormik } from "formik";
import { Button, Input, Spinner, Tooltip } from "@polkadex/ux";
import { Market } from "@orderbook/core/utils/orderbookService/types";
import { useMarketOrder } from "@orderbook/core/hooks";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import { marketOrderValidations } from "@orderbook/core/validations";

import { Balance } from "../balance";

import { Range } from "@/components/ui/Temp/range";

const AMOUNT = "Amount";

const initialValues = {
  amount: "",
};

export const BuyOrder = ({
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
        // TODO: Handle this with toast
        console.log(error);
      }
    },
  });
  const {
    onChangeAmount,
    onIncreaseAmount,
    onDecreaseAmount,
    onChangeRange,
    onExecuteOrder,
    isSignedIn,
  } = useMarketOrder({
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

      <Tooltip open={!!errors.amount && !!values.amount && isSignedIn}>
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
              placeholder="0.0000000000"
              autoComplete="off"
              name={AMOUNT}
              value={values.amount}
              onChange={(e) => onChangeAmount(e.target.value)}
            >
              <Input.Label className="w-[50px]">Amount</Input.Label>
              <Input.Ticker>{market?.quoteAsset?.ticker}</Input.Ticker>
              <Input.Button variant="increase" onClick={onIncreaseAmount} />
              <Input.Button variant="decrease" onClick={onDecreaseAmount} />
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
          appearance="secondary"
          onClick={() => onToogleConnectTrading(true)}
        >
          Connect Trading Account
        </Button.Solid>
      )}
    </form>
  );
};
