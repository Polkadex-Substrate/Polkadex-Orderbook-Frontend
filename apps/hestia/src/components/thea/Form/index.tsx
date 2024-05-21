import {
  Button,
  Input,
  Token,
  TokenAppearance,
  Tooltip,
  Typography,
  ResponsiveCard,
  HoverInformation,
  AccountCombobox,
} from "@polkadex/ux";
import {
  RiArrowDownSLine,
  RiArrowLeftRightLine,
  RiInformationFill,
  RiWalletLine,
} from "@remixicon/react";
import { Fragment, useMemo, useState } from "react";
import { useTheaProvider } from "@orderbook/core/providers";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useFormik } from "formik";
import classNames from "classnames";
import { bridgeValidations } from "@orderbook/core/validations";

import { SelectAsset } from "../selectAsset";
import { ConnectAccount } from "../connectAccount";
import { ConfirmTransaction } from "../confirmTransaction";

import { WalletCard } from "./walletCard";
import { SelectNetwork } from "./selectNetwork";

import { createQueryString, formatAmount } from "@/helpers";
const initialValues = {
  amount: "",
};
export const Form = () => {
  const [openAsset, setOpenAsset] = useState(false);
  const [openFeeModal, setOpenFeeModal] = useState(false);
  const [openSourceModal, setOpenSourceModal] = useState(false);

  const {
    sourceChain,
    setSourceChain,
    destinationChain,
    setDestinationChain,
    sourceAccount,
    setSourceAccount,
    destinationAccount,
    setDestinationAccount,
    selectedAsset,
    transferConfigLoading,
    sourceBalancesLoading,
    transferConfig,
    selectedAssetBalance,
    supportedSourceChains,
    supportedDestinationChains,
  } = useTheaProvider();
  const { destinationFee, sourceFee, max, min } = transferConfig ?? {};
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const onSwitchChain = () => {
    setSourceChain(destinationChain);
    setDestinationChain(sourceChain);
    const data = [
      { name: "from", value: destinationChain?.name },
      { name: "to", value: sourceChain?.name },
    ];
    createQueryString({
      data,
      pathname,
      searchParams,
      push,
    });
    resetForm();
  };

  const {
    handleSubmit,
    errors,
    getFieldProps,
    isValid,
    dirty,
    values,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema: bridgeValidations(min?.amount, max?.amount),
    onSubmit: () => setOpenFeeModal(true),
  });
  const disabled = useMemo(
    () =>
      !selectedAsset ||
      !sourceAccount ||
      !sourceChain ||
      !destinationAccount ||
      !destinationChain ||
      transferConfigLoading ||
      !(isValid && dirty),
    [
      selectedAsset,
      sourceAccount,
      sourceChain,
      destinationAccount,
      destinationChain,
      transferConfigLoading,
      dirty,
      isValid,
    ]
  );

  const onChangeMax = () => {
    const formattedAmount = formatAmount(max?.amount ?? 0);
    setFieldValue("amount", formattedAmount);
  };

  const availableValue = useMemo(
    () => formatAmount(transferConfig?.max.amount ?? 0),
    [transferConfig?.max.amount]
  );

  const balanceAmount = useMemo(
    () => formatAmount(selectedAssetBalance),
    [selectedAssetBalance]
  );

  const [
    destinationFeeAmount,
    destinationFeeTicker,
    sourceFeeAmount,
    sourceFeeTicker,
  ] = useMemo(() => {
    const destValue = destinationFee?.amount;
    const sourceValue = sourceFee?.amount;

    return [
      destValue ? `~${formatAmount(destValue)}` : "Ø",
      destValue ? destinationFee?.ticker : "",
      sourceValue ? `~${formatAmount(sourceValue)}` : "Ø",
      sourceValue ? sourceFee?.ticker : "",
    ];
  }, [
    destinationFee?.amount,
    destinationFee?.ticker,
    sourceFee?.amount,
    sourceFee?.ticker,
  ]);

  return (
    <Fragment>
      <ConfirmTransaction
        openFeeModal={openFeeModal}
        setOpenFeeModal={setOpenFeeModal}
        amount={Number(values.amount)}
        onSuccess={() => {
          resetForm();
          setOpenFeeModal(false);
        }}
      />
      <SelectAsset open={openAsset} onOpenChange={setOpenAsset} />
      <ConnectAccount
        open={openSourceModal}
        onOpenChange={setOpenSourceModal}
        setAccount={setSourceAccount}
      />

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 flex-1 max-w-[900px] mx-auto py-8 w-full px-2"
      >
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <Typography.Heading>Networks</Typography.Heading>
            <div className="flex max-lg:flex-col gap-2">
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex flex-col gap-2">
                  <Typography.Text appearance="primary">From</Typography.Text>
                  <SelectNetwork
                    name={sourceChain?.name}
                    icon={sourceChain?.logo}
                  >
                    {supportedSourceChains.map((e) => {
                      return (
                        <SelectNetwork.Card
                          key={e.genesis}
                          icon={e.logo}
                          value={e.name}
                          side="from"
                          onSelect={() => setSourceChain(e)}
                        />
                      );
                    })}
                  </SelectNetwork>
                </div>
                {sourceAccount ? (
                  <WalletCard
                    name={sourceAccount.name}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setOpenSourceModal(true);
                    }}
                  >
                    {sourceAccount.address}
                  </WalletCard>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <RiWalletLine className="w-3.5 h-3.5 text-actionInput" />
                      <Typography.Text>Account not present</Typography.Text>
                    </div>
                    <Button.Solid
                      appearance="secondary"
                      size="xs"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setOpenSourceModal(true);
                      }}
                    >
                      Connect wallet
                    </Button.Solid>
                  </div>
                )}
              </div>
              <Button.Icon
                type="button"
                variant="outline"
                className="lg:mt-9 h-10 w-10 p-3 max-lg:self-center"
                onClick={onSwitchChain}
              >
                <RiArrowLeftRightLine className="w-full h-full" />
              </Button.Icon>
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex flex-col gap-2">
                  <Typography.Text appearance="primary">To</Typography.Text>
                  <SelectNetwork
                    name={destinationChain?.name}
                    icon={destinationChain?.logo}
                  >
                    {supportedDestinationChains.map((e) => {
                      return (
                        <SelectNetwork.Card
                          key={e.genesis}
                          icon={e.logo}
                          value={e.name}
                          side="to"
                          onSelect={() => setDestinationChain(e)}
                        />
                      );
                    })}
                  </SelectNetwork>
                </div>
                <AccountCombobox
                  account={destinationAccount}
                  setAccount={(e) => e && setDestinationAccount(e)}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Typography.Heading>Asset</Typography.Heading>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2">
                <Typography.Text appearance="primary">Amount</Typography.Text>
                <HoverInformation>
                  <HoverInformation.Trigger
                    loading={transferConfigLoading || sourceBalancesLoading}
                  >
                    <RiInformationFill className="w-3 h-3 text-actionInput" />
                    <Typography.Text size="xs" appearance="primary">
                      Available: {availableValue} {selectedAsset?.ticker}
                    </Typography.Text>
                    <HoverInformation.Arrow />
                  </HoverInformation.Trigger>
                  <HoverInformation.Content>
                    <ResponsiveCard
                      label="Source fee"
                      loading={transferConfigLoading}
                    >
                      {sourceFeeAmount} {sourceFeeTicker}
                    </ResponsiveCard>
                    <ResponsiveCard
                      label="Destination fee"
                      loading={transferConfigLoading}
                    >
                      {destinationFeeAmount} {destinationFeeTicker}
                    </ResponsiveCard>
                    <ResponsiveCard
                      label="Balance"
                      loading={sourceBalancesLoading}
                    >
                      {balanceAmount} {selectedAsset?.ticker}
                    </ResponsiveCard>
                    <ResponsiveCard
                      label="Available"
                      loading={sourceBalancesLoading}
                    >
                      {availableValue} {selectedAsset?.ticker}
                    </ResponsiveCard>
                  </HoverInformation.Content>
                </HoverInformation>
              </div>
              <div className="flex item-center border border-primary rounded-sm">
                <Tooltip open={!!errors.amount}>
                  <Tooltip.Trigger asChild>
                    <div
                      className={classNames(
                        "w-full pr-4",
                        errors.amount && "border-danger-base border"
                      )}
                    >
                      <Input.Vertical
                        type="text"
                        autoComplete="off"
                        placeholder="Enter an amount"
                        {...getFieldProps("amount")}
                        className="max-sm:focus:text-[16px] w-full pl-4 py-4"
                      >
                        {sourceAccount && max?.amount && (
                          <Input.Action
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              onChangeMax();
                            }}
                          >
                            MAX
                          </Input.Action>
                        )}
                      </Input.Vertical>
                    </div>
                  </Tooltip.Trigger>
                  <Tooltip.Content className="bg-level-5 z-[2] p-1">
                    {errors.amount}
                  </Tooltip.Content>
                </Tooltip>
                <Button.Outline
                  type="button"
                  appearance="secondary"
                  className="gap-1 px-2 justify-between h-full"
                  onClick={() => setOpenAsset(true)}
                  disabled={!sourceChain || !destinationChain}
                >
                  <div className="flex items-center gap-2">
                    {selectedAsset ? (
                      <Token
                        name={selectedAsset.ticker}
                        size="md"
                        appearance={selectedAsset.ticker as TokenAppearance}
                        className="rounded-full border border-primary"
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-level-5" />
                    )}

                    <Typography.Text size="md">
                      {selectedAsset ? selectedAsset.ticker : "Select token"}
                    </Typography.Text>
                  </div>
                  <RiArrowDownSLine className="w-4 h-4" />
                </Button.Outline>
              </div>
            </div>
          </div>
        </div>
        <Button.Solid className="w-full py-5" size="md" disabled={disabled}>
          Bridge
        </Button.Solid>
      </form>
    </Fragment>
  );
};