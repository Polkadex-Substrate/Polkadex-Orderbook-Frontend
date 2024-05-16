"use client";

import {
  Copy,
  Interaction,
  Loading,
  Modal,
  Skeleton,
  Typography,
  truncateString,
} from "@polkadex/ux";
import {
  RiExternalLinkLine,
  RiFileCopyLine,
  RiGasStationLine,
  RiInformationFill,
} from "@remixicon/react";
import { Dispatch, SetStateAction, useMemo } from "react";
import Link from "next/link";
import { THEA_AUTOSWAP } from "@orderbook/core/index";
import { useTheaProvider } from "@orderbook/core/providers";

import { useBridge, usePool } from "@/hooks";
import {
  ErrorMessage,
  GenericHorizontalItem,
  Terms,
} from "@/components/ui/ReadyToUse";
import { formatAmount } from "@/helpers";
import { HoverInformation } from "@/components/ui/Temp/hoverInformation";
import { ResponsiveCard } from "@/components/ui/Temp/responsiveCard";

interface Props {
  openFeeModal: boolean;
  setOpenFeeModal: Dispatch<SetStateAction<boolean>>;
  amount: number;
  onSuccess: () => void;
}

export const ConfirmTransaction = ({
  openFeeModal,
  setOpenFeeModal,
  amount,
  onSuccess,
}: Props) => {
  const {
    sourceAccount,
    destinationAccount,
    transferConfig,
    transferConfigLoading,
    destinationPDEXBalance,
    selectedAsset,
    isPolkadexChain,
    polkadexAssets,
    sourceBalancesLoading,
  } = useTheaProvider();
  const { destinationFee, sourceFee, sourceFeeBalance } = transferConfig ?? {};

  const showAutoSwap = useMemo(
    () => !isPolkadexChain && !destinationPDEXBalance,
    [isPolkadexChain, destinationPDEXBalance]
  );

  const selectedAssetId = useMemo(
    () =>
      polkadexAssets?.find((e) =>
        e.ticker.includes(selectedAsset?.ticker ?? "")
      )?.id,
    [polkadexAssets, selectedAsset?.ticker]
  );

  const { swapPrice = 0, swapLoading } = usePool({
    asset: selectedAssetId,
    amount: THEA_AUTOSWAP,
    enabled: !destinationPDEXBalance,
  });

  const shortSourceAddress = useMemo(
    () => truncateString(sourceAccount?.address ?? "", 4),
    [sourceAccount?.address]
  );

  const shortDestinationAddress = useMemo(
    () => truncateString(destinationAccount?.address ?? "", 4),
    [destinationAccount?.address]
  );
  const { mutateAsync, isLoading } = useBridge({ onSuccess });

  const error = useMemo(() => {
    const autoSwapAmount = showAutoSwap ? swapPrice : 0;
    const balance = sourceFeeBalance?.amount ?? 0;

    if (isPolkadexChain) return balance < (sourceFee?.amount ?? 0);

    return balance < amount + autoSwapAmount;
  }, [
    swapPrice,
    sourceFee,
    isPolkadexChain,
    amount,
    showAutoSwap,
    sourceFeeBalance?.amount,
  ]);

  const disabled = useMemo(() => !!error || isLoading, [error, isLoading]);

  const sourceFeeBalanceAmount = useMemo(
    () => formatAmount(sourceFeeBalance?.amount ?? 0),
    [sourceFeeBalance?.amount]
  );

  const [
    destinationFeeAmount,
    destinationFeeTicker,
    sourceFeeAmount,
    sourceFeeTicker,
    estimatedFee,
  ] = useMemo(() => {
    const destValue = destinationFee?.amount ?? 0;
    const sourceValue = sourceFee?.amount ?? 0;
    const autoswapAmount = showAutoSwap ? swapPrice : 0;
    return [
      destValue ? `~${formatAmount(destValue)}` : "Ø",
      destValue ? destinationFee?.ticker : "",
      sourceValue ? `~${formatAmount(sourceValue)}` : "Ø",
      sourceValue ? sourceFee?.ticker : "",
      formatAmount(sourceValue + destValue + autoswapAmount),
    ];
  }, [
    destinationFee?.amount,
    destinationFee?.ticker,
    sourceFee?.amount,
    sourceFee?.ticker,
    showAutoSwap,
    swapPrice,
  ]);

  return (
    <Modal
      open={openFeeModal}
      onOpenChange={setOpenFeeModal}
      placement="center left"
      className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <Modal.Content>
        <Loading.Spinner active={isLoading}>
          <Interaction className="w-full gap-2 md:min-w-[24rem] md:max-w-[24rem]">
            <Interaction.Title
              onClose={{ onClick: () => setOpenFeeModal(false) }}
            >
              Confirm Transaction
            </Interaction.Title>
            <Interaction.Content className="flex flex-col p-3">
              <div className="flex flex-col border-b border-primary">
                <GenericHorizontalItem label="Amount">
                  <Typography.Text>
                    {amount} {selectedAsset?.ticker}
                  </Typography.Text>
                </GenericHorizontalItem>
                <GenericHorizontalItem label="Sending wallet">
                  <Skeleton
                    loading={!sourceAccount}
                    className="min-h-4 max-w-24"
                  >
                    <Copy value={sourceAccount?.address ?? ""}>
                      <div className="flex items-center gap-1">
                        <RiFileCopyLine className="w-3 h-3 text-secondary" />
                        <Typography.Text>
                          {sourceAccount?.name} • {shortSourceAddress}
                        </Typography.Text>
                      </div>
                    </Copy>
                  </Skeleton>
                </GenericHorizontalItem>
                <GenericHorizontalItem label="Destination wallet">
                  <Copy value={destinationAccount?.address ?? ""}>
                    <div className="flex items-center gap-1">
                      <RiFileCopyLine className="w-3 h-3 text-secondary" />
                      <Typography.Text>
                        {destinationAccount?.name} • {shortDestinationAddress}
                      </Typography.Text>
                    </div>
                  </Copy>
                </GenericHorizontalItem>
                {showAutoSwap && (
                  <GenericHorizontalItem
                    label="Swap required"
                    tooltip={`In order to bridge your funds and sign transactions on Polkadex, you must have at least 1.5 PDEX in your destination wallet. Your current destination wallet balance is ${destinationPDEXBalance} PDEX.
                  A small part of your transfer will be auto-swapped to PDEX to meet this requirement`}
                  >
                    <div className="flex items-center gap-1">
                      <RiGasStationLine className="w-3.5 h-3.5 text-secondary" />
                      <Skeleton loading={swapLoading} className="min-h-4 w-10">
                        <div className="flex items-center gap-1">
                          <Typography.Text>
                            {swapPrice.toFixed(4)}{" "}
                            {transferConfig?.sourceFee.ticker}
                          </Typography.Text>
                          <Typography.Text appearance="primary">
                            ≈
                          </Typography.Text>
                          <Skeleton
                            loading={transferConfigLoading}
                            className="min-h-4 max-w-24"
                          >
                            <Typography.Text appearance="primary">
                              1.5 PDEX
                            </Typography.Text>
                          </Skeleton>
                        </div>
                      </Skeleton>
                    </div>
                  </GenericHorizontalItem>
                )}
                <HoverInformation>
                  <HoverInformation.Trigger>
                    <div className="w-full flex items-center justify-between gap-2 px-3 py-3">
                      <div className="flex items-center gap-1">
                        <RiInformationFill className="w-3 h-3 text-actionInput" />
                        <Typography.Text appearance="primary">
                          Estimated fee
                        </Typography.Text>
                      </div>
                      <Skeleton
                        loading={
                          showAutoSwap ? swapLoading : transferConfigLoading
                        }
                        className="min-h-4 w-10"
                      >
                        <Typography.Text>
                          {estimatedFee} {sourceFeeTicker}
                        </Typography.Text>
                      </Skeleton>
                    </div>
                  </HoverInformation.Trigger>
                  <HoverInformation.Content>
                    <ResponsiveCard label="Source fee">
                      {sourceFeeAmount} {sourceFeeTicker}
                    </ResponsiveCard>
                    <ResponsiveCard
                      label="Destination fee"
                      loading={transferConfigLoading}
                    >
                      {destinationFeeAmount} {destinationFeeTicker}
                    </ResponsiveCard>
                    {showAutoSwap && (
                      <ResponsiveCard label="Auto swap">
                        {swapPrice.toFixed(4)} {sourceFeeTicker}
                      </ResponsiveCard>
                    )}
                  </HoverInformation.Content>
                </HoverInformation>

                <ResponsiveCard
                  label="Wallet balance"
                  loading={transferConfigLoading || sourceBalancesLoading}
                  className="px-3 py-3"
                >
                  {sourceFeeBalanceAmount} {sourceFeeTicker}
                </ResponsiveCard>

                {error && (
                  <ErrorMessage className="p-3">
                    Your balance is not enough to pay the fee.
                  </ErrorMessage>
                )}
              </div>
              <div className="flex flex-col gap-3 px-3 pt-4">
                <Link
                  href="https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Terms_of_Use.pdf"
                  className="flex items-center gap-1"
                  target="_blank"
                >
                  <Typography.Text appearance="secondary" bold>
                    Terms and conditions
                  </Typography.Text>
                  <RiExternalLinkLine className="w-3 h-3 text-secondary" />
                </Link>
                <div className="overflow-hidden relative">
                  <div className=" max-h-24 overflow-auto pb-6">
                    <Terms />
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-[45px] bg-gradient-to-t from-level-0 to-transparent" />
                </div>
              </div>
            </Interaction.Content>
            <Interaction.Footer>
              <Interaction.Action
                disabled={disabled}
                appearance={disabled ? "secondary" : "primary"}
                onClick={async () =>
                  await mutateAsync({
                    amount,
                    tokenFeeId: sourceFeeTicker ?? "",
                  })
                }
              >
                Sign and Submit
              </Interaction.Action>
              <Interaction.Close onClick={() => setOpenFeeModal(false)}>
                Close
              </Interaction.Close>
            </Interaction.Footer>
          </Interaction>
        </Loading.Spinner>
      </Modal.Content>
    </Modal>
  );
};
