"use client";

import { Fragment, MouseEvent, useCallback, useMemo, useState } from "react";
import { Interaction, Typography } from "@polkadex/ux";
import { ExtensionAccount } from "@polkadex/react-providers";
import { ExtensionsArray } from "@polkadot-cloud/assets/extensions";
import { useCall, useTransactionFeeModal } from "@orderbook/core/index";
import { Account } from "@orderbook/core/providers/user/connectWalletProvider";

import { GenericSelectCard, TradingAccountCard } from "../ReadyToUse";

import { ConfirmTransaction } from "./confirmTransaction";

type RemoveProps = { proxy: string; assetId?: string };
export const RemoveTradingAccount = ({
  tradingAccount,
  fundWallet,
  onRemoveFromDevice,
  onRemoveGoogleDrive,
  onRemoveFromChain,
  onCancel,
  loading,
  availableOnDevice,
  enabledExtensionAccount = false,
}: {
  tradingAccount?: Account;
  fundWallet?: ExtensionAccount;
  onRemoveFromDevice: (e: string) => void;
  onRemoveGoogleDrive: (e: string) => Promise<void>;
  onRemoveFromChain?: (props: RemoveProps) => Promise<void>;
  onCancel: (e: MouseEvent<HTMLButtonElement>) => void;
  loading?: boolean;
  selectedExtension?: (typeof ExtensionsArray)[0];
  errorTitle?: string;
  errorMessage?: string;
  availableOnDevice?: boolean;
  enabledExtensionAccount?: boolean;
}) => {
  const {
    openFeeModal,
    onOpenFeeModal,
    setOpenFeeModal,
    tokenFee,
    setTokenFee,
  } = useTransactionFeeModal();

  const [state, setState] = useState({
    removeDevice: false,
    removeBlockchain: false,
  });

  const disableButton = useMemo(
    () => !Object.values(state).some((item) => item),
    [state]
  );

  const handleRemoveBlockchain = useCallback(
    async (e: RemoveProps, event: MouseEvent<HTMLButtonElement>) => {
      await onRemoveFromChain?.({
        ...e,
        assetId: tokenFee?.id,
      });
      onCancel(event);
    },
    [onCancel, onRemoveFromChain, tokenFee?.id]
  );

  const handleRemoveFromDevice = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      onRemoveFromDevice?.(tradingAccount?.data.address ?? "");
      onCancel(event);
    },
    [onCancel, onRemoveFromDevice, tradingAccount?.data.address]
  );

  const handleRemoveFromGoogle = useCallback(
    async (event: MouseEvent<HTMLButtonElement>) => {
      await onRemoveGoogleDrive(tradingAccount?.data.address ?? "");
      onCancel(event);
    },
    [onCancel, onRemoveGoogleDrive, tradingAccount?.data.address]
  );

  const removeProps = useMemo(
    () => ({
      proxy: tradingAccount?.data.address ?? "",
    }),
    [tradingAccount?.data.address]
  );

  const { onRemoveProxyAccountOcex } = useCall();
  return (
    <Fragment>
      <ConfirmTransaction
        action={async (e) => {
          await handleRemoveBlockchain(removeProps, e);
          setOpenFeeModal(false);
        }}
        actionLoading={!!loading}
        extrinsicFn={() =>
          onRemoveProxyAccountOcex([tradingAccount?.data.address ?? ""])
        }
        sender={tradingAccount?.data.address ?? ""}
        tokenFee={tokenFee}
        setTokenFee={setTokenFee}
        openFeeModal={openFeeModal}
        setOpenFeeModal={setOpenFeeModal}
      />
      <Interaction className="w-full">
        <Interaction.Content className="flex flex-col gap-1 flex-1">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col text-center items-center gap-1">
              <Typography.Text bold size="xl">
                Remove trading account
              </Typography.Text>
              <Typography.Paragraph size="sm" appearance="primary">
                Are you sure you want
                <span className="text-current">
                  {" "}
                  remove this trading account?{" "}
                </span>
                Don&apos;t worry your funds are safe in your funding account.
              </Typography.Paragraph>
            </div>
            <TradingAccountCard
              address={tradingAccount?.data.address ?? ""}
              name={tradingAccount?.data.meta.name as string}
              type={tradingAccount?.type ?? ""}
              enabledExtensionAccount={enabledExtensionAccount}
            />
            <div className="flex flex-col gap-2">
              <GenericSelectCard
                title="Remove from your device"
                icon="Device"
                checked={state.removeDevice}
                disabled={!availableOnDevice}
                onChange={() =>
                  setState({
                    ...state,
                    removeDevice: state.removeBlockchain
                      ? true
                      : !state.removeDevice,
                  })
                }
              />
              <GenericSelectCard
                title="Remove  from blockchain"
                icon="Blockchain"
                checked={state.removeBlockchain}
                onChange={() =>
                  setState((prevState) => ({
                    removeDevice:
                      !!availableOnDevice && !state.removeBlockchain,
                    removeBlockchain: !prevState.removeBlockchain,
                  }))
                }
                disabled={!fundWallet}
              />
            </div>
          </div>
        </Interaction.Content>
        <Interaction.Footer>
          <Interaction.Action
            onClick={
              state.removeBlockchain
                ? onOpenFeeModal
                : tradingAccount?.type === "Google Drive"
                  ? handleRemoveFromGoogle
                  : handleRemoveFromDevice
            }
            disabled={disableButton}
          >
            Yes, remove account
          </Interaction.Action>
          <Interaction.Close onClick={onCancel}>Cancel</Interaction.Close>
        </Interaction.Footer>
      </Interaction>
    </Fragment>
  );
};
