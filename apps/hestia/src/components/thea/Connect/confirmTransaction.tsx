"use client";

import {
  Button,
  Copy,
  Dropdown,
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
} from "@remixicon/react";
import {
  Dispatch,
  Fragment,
  SetStateAction,
  useMemo,
  useRef,
  useState,
} from "react";
import { useResizeObserver } from "usehooks-ts";
import Link from "next/link";
import {
  FeeAssetReserve,
  enabledFeatures,
  useFunds,
} from "@orderbook/core/index";
import { useTheaProvider } from "@orderbook/core/providers";

import { useBridge, usePool } from "@/hooks";
import {
  ErrorMessage,
  GenericHorizontalItem,
  Terms,
} from "@/components/ui/ReadyToUse";
const { payWithAnotherFee } = enabledFeatures;

interface Props {
  openFeeModal: boolean;
  setOpenFeeModal: Dispatch<SetStateAction<boolean>>;
  amount: number;
}
export const ConfirmTransaction = ({
  openFeeModal,
  setOpenFeeModal,
  amount,
}: Props) => {
  const { mutateAsync, isLoading } = useBridge();
  const [tokenFee, setTokenFee] = useState<FeeAssetReserve | null>({
    id: "PDEX",
    name: "PDEX",
  });

  const {
    selectedAssetBalance,
    sourceAccount,
    destinationAccount,
    transferConfig,
    transferConfigLoading,
  } = useTheaProvider();

  const sourceFee = transferConfig?.sourceFee?.amount ?? 0;
  const destinationFee = transferConfig?.destinationFee?.amount ?? 0;

  const ref = useRef<HTMLButtonElement>(null);

  const { width = 0 } = useResizeObserver({
    ref,
    box: "border-box",
  });

  const {
    swapPrice = 0,
    swapLoading,
    poolReserves,
    poolReservesSuccess,
  } = usePool({
    asset: tokenFee?.id ?? "",
    amount: transferConfig?.sourceFee.amount ?? 0,
  });

  const { balances, loading: balancesLoading } = useFunds();

  const isPDEX = useMemo(() => tokenFee?.id === "PDEX", [tokenFee?.id]);

  const pdexBalance = 100;

  const error = useMemo(
    () =>
      tokenFee?.id && isPDEX
        ? pdexBalance < sourceFee
        : selectedAssetBalance < swapPrice,
    [isPDEX, selectedAssetBalance, swapPrice, tokenFee?.id, sourceFee]
  );

  const shortSourceAddress = useMemo(
    () => truncateString(sourceAccount?.address ?? "", 4),
    [sourceAccount?.address]
  );

  const shortDestinationAddress = useMemo(
    () => truncateString(destinationAccount?.address ?? "", 4),
    [destinationAccount?.address]
  );
  const disabled = useMemo(() => !!error || !tokenFee, [error, tokenFee]);

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
                  <Typography.Text>{amount}</Typography.Text>
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
                <GenericHorizontalItem label="Estimated source chain fee">
                  <Skeleton
                    loading={transferConfigLoading}
                    className="min-h-4 max-w-24"
                  >
                    <Typography.Text>{sourceFee}</Typography.Text>
                  </Skeleton>
                </GenericHorizontalItem>
                <GenericHorizontalItem label="Estimated destination chain fee">
                  <Skeleton
                    loading={transferConfigLoading}
                    className="min-h-4 max-w-24"
                  >
                    <Typography.Text>{destinationFee}</Typography.Text>
                  </Skeleton>
                </GenericHorizontalItem>
                {!!tokenFee && !isPDEX && !isLoading ? (
                  <GenericHorizontalItem
                    label="Estimated fee"
                    tooltip="Swap using Polkapool"
                  >
                    <div className="flex items-center gap-1">
                      <RiGasStationLine className="w-3.5 h-3.5 text-secondary" />
                      <Skeleton loading={swapLoading} className="min-h-4 w-10">
                        <div className="flex items-center gap-1">
                          <Typography.Text>{`${swapPrice.toFixed(4)} ${tokenFee?.name}`}</Typography.Text>
                          <Typography.Text appearance="primary">
                            ≈
                          </Typography.Text>
                          <Typography.Text appearance="primary">{`${sourceFee} PDEX`}</Typography.Text>
                        </div>
                      </Skeleton>
                    </div>
                  </GenericHorizontalItem>
                ) : (
                  <GenericHorizontalItem label="Estimated fee">
                    <div className="flex items-center gap-1">
                      <RiGasStationLine className="w-3.5 h-3.5 text-secondary" />
                      <Skeleton
                        loading={isLoading}
                        className="min-h-4 min-w-14"
                      >
                        <Typography.Text>{destinationFee}</Typography.Text>
                      </Skeleton>
                    </div>
                  </GenericHorizontalItem>
                )}
                <Dropdown>
                  <Dropdown.Trigger
                    ref={ref}
                    className=" px-3 py-3 bg-level-1 border border-primary"
                    disabled={!payWithAnotherFee}
                  >
                    <div className="flex-1 w-full flex items-cneter justify-between gap-2">
                      <Typography.Text appearance="primary">
                        Pay fee with
                      </Typography.Text>
                      <Typography.Text>
                        {tokenFee ? tokenFee.name : "Select token"}
                      </Typography.Text>
                    </div>
                    <Dropdown.Icon />
                  </Dropdown.Trigger>
                  <Dropdown.Content
                    style={{
                      minWidth: width,
                      maxHeight: 250,
                      overflow: "auto",
                    }}
                    className="scrollbar-hide min-w-56"
                  >
                    {!poolReservesSuccess ? (
                      <div className="flex flex-col gap-2 p-4">
                        {new Array(3).fill("").map((_, i) => (
                          <Skeleton key={i} className="min-h-10" loading />
                        ))}
                      </div>
                    ) : (
                      <Fragment>
                        {poolReserves?.map((e) => {
                          const balance = balances?.find(
                            (bal) => bal.asset.id === e.id
                          );

                          const disableDropdown =
                            !payWithAnotherFee && e?.id !== "PDEX";

                          return (
                            <Dropdown.Item
                              key={e.id}
                              onSelect={() => setTokenFee(e)}
                              className="flex justify-between items-center gap-2"
                              disabled={!e.poolReserve || disableDropdown}
                            >
                              {e.poolReserve ? (
                                <div className="flex items-center justify-between gap-1 w-full">
                                  <Typography.Text>{e.name}</Typography.Text>
                                  <div className="flex items-center gap-1">
                                    <Typography.Text appearance="primary">
                                      Balance:
                                    </Typography.Text>
                                    <Skeleton
                                      loading={balancesLoading}
                                      className="min-h-5"
                                    >
                                      <Typography.Text appearance="primary">
                                        {Number(
                                          balance?.onChainBalance
                                        ).toFixed(4)}
                                      </Typography.Text>
                                    </Skeleton>
                                  </div>
                                </div>
                              ) : (
                                <Fragment>
                                  <div className="flex items-center gap-1">
                                    <Typography.Text appearance="primary">
                                      {e.name}
                                    </Typography.Text>
                                    <Typography.Text appearance="primary">
                                      (Insufficient liquidity)
                                    </Typography.Text>
                                  </div>
                                  <Button.Solid
                                    size="xs"
                                    appearance="secondary"
                                  >
                                    <Link
                                      target="_blank"
                                      href="https://polkapool-test.netlify.app/pools"
                                    >
                                      Add liquidity
                                    </Link>
                                  </Button.Solid>
                                </Fragment>
                              )}
                            </Dropdown.Item>
                          );
                        })}
                      </Fragment>
                    )}
                  </Dropdown.Content>
                </Dropdown>
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
                onClick={async () => await mutateAsync({ amount })}
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
