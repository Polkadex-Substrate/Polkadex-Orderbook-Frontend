"use client";

import {
  Accordion,
  Button,
  Copy,
  Dropdown,
  Interaction,
  Loading,
  Skeleton,
  Typography,
  truncateString,
} from "@polkadex/ux";
import {
  RiAddLine,
  RiExternalLinkLine,
  RiFileCopyLine,
  RiGasStationLine,
} from "@remixicon/react";
import { Fragment, useMemo, useRef, useState } from "react";
import { useResizeObserver } from "usehooks-ts";
import Link from "next/link";
import {
  TransactionFeeProps,
  useFunds,
  useTransactionFee,
} from "@orderbook/core/index";
import { useConnectWalletProvider } from "@orderbook/core/providers/user/connectWalletProvider";

import { ErrorMessage, GenericHorizontalItem, Terms } from "../ReadyToUse";

import { FeeAssetReserve, usePool } from "@/hooks";

interface Props extends TransactionFeeProps {
  onClose: () => void;
  action: () => Promise<void>;
  actionLoading: boolean;
}
export const ConfirmTransaction = ({
  onClose,
  action,
  extrinsicFn,
  sender,
  actionLoading,
}: Props) => {
  const { fee, hash, palletName, extrinsicName, loading, success } =
    useTransactionFee({
      extrinsicFn,
      sender,
    });

  const isLoading = useMemo(() => loading && !success, [loading, success]);

  const [state, setState] = useState<FeeAssetReserve | null>(null);

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
    asset: state,
    amount: fee,
  });

  const { walletBalance = 0, selectedWallet } = useConnectWalletProvider();
  const { balances, loading: balancesLoading } = useFunds();

  const isPDEX = useMemo(() => state?.id === "PDEX", [state]);

  const selectedAssetBalance = useMemo(
    () => balances.find((e) => e.asset.id === state?.id),
    [state?.id, balances]
  );

  const error = useMemo(
    () =>
      state && isPDEX
        ? walletBalance < fee + 1
        : Number(selectedAssetBalance?.onChainBalance) < swapPrice,
    [
      state,
      fee,
      selectedAssetBalance?.onChainBalance,
      swapPrice,
      isPDEX,
      walletBalance,
    ]
  );

  const shortHash = useMemo(() => truncateString(hash), [hash]);
  const shortAddress = useMemo(
    () => truncateString(selectedWallet?.address ?? ""),
    [selectedWallet?.address]
  );

  return (
    <Loading.Spinner active={actionLoading}>
      <Interaction className="w-full gap-2 md:min-w-[24rem] md:max-w-[24rem]">
        <Interaction.Title onClose={{ onClick: onClose }}>
          Confirm Transaction
        </Interaction.Title>
        <Interaction.Content className="flex flex-col p-3">
          <div className="flex flex-col border-b border-primary px-3 pb-4">
            <Typography.Text appearance="primary">Extrinsic</Typography.Text>
            <Accordion type="multiple">
              <Accordion.Item value="extrinsic">
                <Accordion.Trigger>
                  <Skeleton loading={isLoading} className="min-h-4 max-w-28">
                    <Typography.Text>{extrinsicName}</Typography.Text>
                  </Skeleton>
                  <Accordion.Icon>
                    <RiAddLine className="w-4 h-4 text-primary" />
                  </Accordion.Icon>
                </Accordion.Trigger>
                <Accordion.Content>
                  <div className="flex flex-col mt-4 border-t border-primary">
                    <GenericHorizontalItem label="Name" className="px-0">
                      <Skeleton
                        loading={isLoading}
                        className="min-h-4 max-w-14"
                      >
                        <Copy value={hash}>
                          <Typography.Text>{palletName}</Typography.Text>
                        </Copy>
                      </Skeleton>
                    </GenericHorizontalItem>
                    <GenericHorizontalItem label="Call hash" className="px-0">
                      <Skeleton
                        loading={isLoading}
                        className="min-h-4 max-w-20"
                      >
                        <Copy value={hash}>
                          <div className="flex items-center gap-1">
                            <RiFileCopyLine className="w-3 h-3 text-secondary" />
                            <Typography.Text>{shortHash}</Typography.Text>
                          </div>
                        </Copy>
                      </Skeleton>
                    </GenericHorizontalItem>
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion>
          </div>
          <div className="flex flex-col border-b border-primary">
            <GenericHorizontalItem label="Sending from">
              <Skeleton loading={!selectedWallet} className="min-h-4 max-w-24">
                <Copy value="0xD3…6Ae">
                  <div className="flex items-center gap-1">
                    <RiFileCopyLine className="w-3 h-3 text-secondary" />
                    <Typography.Text>
                      {selectedWallet?.name} • {shortAddress}
                    </Typography.Text>
                  </div>
                </Copy>
              </Skeleton>
            </GenericHorizontalItem>
            {state && !isPDEX && !isLoading ? (
              <GenericHorizontalItem
                label="Estimated fee"
                tooltip="Swap using Polkapool"
              >
                <div className="flex items-center gap-1">
                  <RiGasStationLine className="w-3.5 h-3.5 text-secondary" />
                  <Skeleton loading={swapLoading} className="min-h-4 w-10">
                    <div className="flex items-center gap-1">
                      <Typography.Text>{`${swapPrice.toFixed(4)} ${state?.name}`}</Typography.Text>
                      <Typography.Text appearance="primary">≈</Typography.Text>
                      <Typography.Text appearance="primary">{`${fee} PDEX`}</Typography.Text>
                    </div>
                  </Skeleton>
                </div>
              </GenericHorizontalItem>
            ) : (
              <GenericHorizontalItem label="Estimated fee">
                <div className="flex items-center gap-1">
                  <RiGasStationLine className="w-3.5 h-3.5 text-secondary" />
                  <Skeleton loading={isLoading} className="min-h-4 min-w-14">
                    <Typography.Text>{fee} PDEX</Typography.Text>
                  </Skeleton>
                </div>
              </GenericHorizontalItem>
            )}
            <Dropdown>
              <Dropdown.Trigger
                ref={ref}
                className=" px-3 py-3 bg-level-1 border border-primary"
              >
                <div className="flex-1 w-full flex items-cneter justify-between gap-2">
                  <Typography.Text appearance="primary">
                    Pay fee with
                  </Typography.Text>
                  <Typography.Text>
                    {state ? state.name : "Select token"}
                  </Typography.Text>
                </div>
                <Dropdown.Icon />
              </Dropdown.Trigger>
              <Dropdown.Content
                style={{ width, maxHeight: 250, overflow: "auto" }}
                className="scrollbar-hide"
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
                      return (
                        <Dropdown.Item
                          key={e.id}
                          onSelect={() => setState(e)}
                          className="flex justify-between items-center gap-2"
                          disabled={!e.poolReserve}
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
                                    {Number(balance?.onChainBalance).toFixed(4)}
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
                              <Button.Solid size="xs" appearance="secondary">
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
            disabled={!!error || !state}
            appearance="secondary"
            onClick={action}
          >
            Sign and Submit
          </Interaction.Action>
          <Interaction.Close onClick={onClose}>Close</Interaction.Close>
        </Interaction.Footer>
      </Interaction>
    </Loading.Spinner>
  );
};
