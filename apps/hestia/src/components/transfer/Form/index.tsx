"use client";

import {
  Typography,
  Token,
  Button,
  Skeleton,
  tokenAppearance,
  Tooltip,
  Modal,
} from "@polkadex/ux";
import {
  Fragment,
  MouseEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ArrowRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { useConnectWalletProvider } from "@orderbook/core/providers/user/connectWalletProvider";
import {
  getChainFromTicker,
  isAssetPDEX,
  trimFloat,
  tryUnlockTradeAccount,
} from "@orderbook/core/helpers";
import { OTHER_ASSET_EXISTENTIAL } from "@orderbook/core/constants";
import { useFormik } from "formik";
import {
  depositValidations,
  withdrawValidations,
} from "@orderbook/core/validations";
import { useDepositProvider } from "@orderbook/core/providers/user/depositProvider";
import { useWithdrawsProvider } from "@orderbook/core/providers/user/withdrawsProvider";

import { FromFunding } from "./fromFunding";
import { FromTrading } from "./fromTrading";

import { FilteredAssetProps, SwitchType } from "@/hooks";
import { UnlockAccount } from "@/components/ui/ReadyToUse/unlockAccount";
const initialValues = { amount: 0.0 };

export const Form = ({
  selectedAsset,
  onAssetsInteraction,
  assetsInteraction,
  type,
  onChangeType,
}: {
  selectedAsset: FilteredAssetProps;
  onAssetsInteraction: (callback?: () => void) => void;
  type: SwitchType;
  onChangeType: (e: SwitchType) => void;
  assetsInteraction?: boolean;
}) => {
  const [cardFocus, setCardFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  const isTransferFromFunding = type === "deposit";

  const { selectedAccount, selectedWallet } = useConnectWalletProvider();
  const { loading: depositLoading, onFetchDeposit } = useDepositProvider();
  const { onFetchWithdraws, loading: withdrawLoading } = useWithdrawsProvider();

  const chainName = useMemo(
    () => getChainFromTicker(selectedAsset?.ticker) || selectedAsset?.name,
    [selectedAsset?.ticker, selectedAsset?.name]
  );

  const isPolkadexToken = useMemo(
    () => isAssetPDEX(selectedAsset?.id),
    [selectedAsset?.id]
  );

  const existentialBalance = useMemo(
    () => (isPolkadexToken ? 1 : OTHER_ASSET_EXISTENTIAL),
    [isPolkadexToken]
  );

  const onChangeFundingMax = () => {
    const onChainBalance = Number(selectedAsset?.onChainBalance);
    if (onChainBalance > existentialBalance) {
      const balance = onChainBalance - existentialBalance;
      const trimmedBalance = trimFloat({ value: balance });
      setFieldValue("amount", trimmedBalance);
    }
  };

  const onChangeTradingMax = () => {
    const availableAmount = Number(selectedAsset?.free_balance);
    const trimmedBalance = trimFloat({ value: availableAmount });
    setFieldValue("amount", trimmedBalance);
  };

  const handleMax = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    isTransferFromFunding ? onChangeTradingMax() : onChangeFundingMax();
  };

  const handleChanteType = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    resetForm();
    onChangeType(type === "deposit" ? "withdraw" : "deposit");
  };

  const validationSchema = useMemo(
    () =>
      isTransferFromFunding
        ? withdrawValidations(selectedAsset?.free_balance ?? "0")
        : depositValidations(
            Number(selectedAsset?.onChainBalance) ?? 0,
            isPolkadexToken,
            existentialBalance
          ),
    [
      existentialBalance,
      isPolkadexToken,
      isTransferFromFunding,
      selectedAsset?.free_balance,
      selectedAsset?.onChainBalance,
    ]
  );
  const onSubmitWithdraw = async ({ amount }: { amount: number }) => {
    if (selectedAccount?.isLocked) setShowPassword(true);
    else {
      const asset = isAssetPDEX(selectedAsset?.id) ? "PDEX" : selectedAsset?.id;
      if (!asset) return;
      try {
        await onFetchWithdraws({ asset, amount });
      } finally {
        resetForm({ values: initialValues });
      }
    }
  };

  const onSubmitDeposit = async ({ amount }: { amount: number }) => {
    if (!selectedWallet) return;
    try {
      const asset: Record<string, string | null> = isPolkadexToken
        ? { polkadex: null }
        : { asset: selectedAsset?.id || null };

      await onFetchDeposit({
        asset,
        amount,
        account: selectedWallet,
      });
    } finally {
      resetForm({ values: initialValues });
    }
  };

  const {
    handleSubmit,
    resetForm,
    errors,
    getFieldProps,
    isValid,
    dirty,
    setFieldValue,
    setErrors,
  } = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: isTransferFromFunding ? onSubmitDeposit : onSubmitWithdraw,
  });

  // const disabled =
  //   !selectedWallet && isTransferFromFunding
  //     ? withdrawLoading
  //     : depositLoading || !(isValid && dirty);

  const disabled = !(isValid && dirty);

  useEffect(() => {
    if (!isTransferFromFunding) tryUnlockTradeAccount(selectedAccount);
  }, [selectedAccount, isTransferFromFunding]);

  return (
    <Fragment>
      <Modal open={showPassword} onOpenChange={setShowPassword}>
        <Modal.Content>
          <UnlockAccount
            onClose={() => setShowPassword(false)}
            onAction={() =>
              formRef?.current?.dispatchEvent(
                new Event("submit", { cancelable: true, bubbles: true })
              )
            }
            tempBrowserAccount={selectedAccount}
          />
        </Modal.Content>
      </Modal>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex w-full border-b border-primary max-md:py-6 md:py-12 bg-level-0"
      >
        <div className="flex-1 flex flex-col gap-4 w-full max-w-[1000px] mx-auto">
          <div className="flex-1 flex max-sm:flex-col items-center w-full border-y border-primary">
            <FromFunding
              focused={cardFocus}
              fromFunding={isTransferFromFunding}
              extensionAccountName={selectedWallet?.name}
              extensionAccountAddress={selectedWallet?.address}
              extensionAccountBalance={selectedAsset?.free_balance}
              localAccountName={selectedAccount?.meta?.name}
              localAccountAddress={selectedAccount?.address}
              localAccountBalance={selectedAsset?.onChainBalance}
              selectedAssetTicker={selectedAsset?.ticker}
            />

            <button
              onClick={handleChanteType}
              className="h-full flex items-center justify-center p-2 max-sm:w-full max-sm:border-y border-primary hover:bg-level-1 duration-300 transition-colors"
            >
              <ArrowRightIcon
                className={classNames(
                  "w-6 h-6 transition-all duration-300",
                  isTransferFromFunding ? "max-sm:rotate-90" : "rotate-[360deg]"
                )}
              />
            </button>
            <FromTrading
              fromFunding={isTransferFromFunding}
              extensionAccountName={selectedWallet?.name}
              extensionAccountAddress={selectedWallet?.address}
              extensionAccountBalance={selectedAsset?.free_balance}
              localAccountBalance={selectedAsset?.onChainBalance}
              selectedAssetTicker={selectedAsset?.ticker}
            />
          </div>
          <div className="flex items-center border border-primary">
            <div
              role="button"
              onClick={() => onAssetsInteraction()}
              className="flex items-center justify-between gap-4 px-5 py-4 border-r border-primary hover:bg-level-1 duration-300 transition-colors min-w-60"
            >
              <div className="flex items-center gap-2">
                <Skeleton
                  loading={!selectedAsset?.ticker}
                  className="w-10 h-10"
                >
                  <Token
                    name={selectedAsset?.ticker}
                    appearance={
                      selectedAsset?.ticker as keyof typeof tokenAppearance
                    }
                    className="w-8 h-8 border border-primary rounded-full"
                  />
                </Skeleton>
                <div
                  className={classNames(
                    "flex flex-col",
                    !selectedAsset && "gap-2"
                  )}
                >
                  <Skeleton
                    loading={!selectedAsset?.ticker}
                    className="w-20 h-4"
                  >
                    <Typography.Text size="md" bold>
                      {selectedAsset?.ticker}
                    </Typography.Text>
                  </Skeleton>
                  <Skeleton
                    loading={!selectedAsset?.ticker}
                    className="w-10 h-4"
                  >
                    <Typography.Text
                      appearance="primary"
                      size="sm"
                      className="whitespace-nowrap first-letter:uppercase lowercase"
                    >
                      {chainName}
                    </Typography.Text>
                  </Skeleton>
                </div>
              </div>
              <div>
                <ChevronDownIcon className="w-4 h-4" />
              </div>
            </div>

            <div
              className={classNames(
                "w-full flex items-center justify-between gap-2 pr-4 h-full",
                !!errors.amount && "border-danger-base border rounded-md"
              )}
            >
              <Tooltip open={!!errors.amount && !assetsInteraction}>
                <Tooltip.Trigger asChild>
                  <input
                    type="text"
                    autoComplete="off"
                    placeholder="0.000000000"
                    className="text-current flex-1 p-4 bg-transparent"
                    onFocus={() => setCardFocus(true)}
                    disabled={!selectedWallet}
                    {...getFieldProps("amount")}
                    onBlur={() => {
                      setCardFocus(false);
                      setErrors({ amount: "" });
                    }}
                  />
                </Tooltip.Trigger>
                <Tooltip.Content side="left" className="bg-level-5 z-[1]">
                  {errors.amount && errors.amount}
                </Tooltip.Content>
              </Tooltip>
              <Button.Solid
                appearance="secondary"
                size="xs"
                onMouseEnter={() => setCardFocus(true)}
                onMouseLeave={() => setCardFocus(false)}
                onClick={handleMax}
              >
                MAX
              </Button.Solid>
            </div>
          </div>
          <Button.Solid
            type="submit"
            // disabled={disabled}
            appearance="primary"
            size="md"
            className="w-full py-5"
          >
            Transfer
          </Button.Solid>
        </div>
      </form>
    </Fragment>
  );
};
