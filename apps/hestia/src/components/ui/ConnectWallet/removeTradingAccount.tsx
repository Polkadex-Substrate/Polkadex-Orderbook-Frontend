"use client";

import { Fragment, useCallback, useMemo, useState } from "react";
import { Interaction, Typography } from "@polkadex/ux";
import { TradeAccount } from "@orderbook/core/providers/types";
import { ExtensionAccount } from "@polkadex/react-providers";
import { ExtensionsArray } from "@polkadot-cloud/assets/extensions";
import { useCall } from "@orderbook/core/index";

import { GenericSelectCard, TradingAccountCard } from "../ReadyToUse";

import { ConfirmTransaction } from "./confirmTransaction";

import { FeeAssetReserve } from "@/hooks";

type RemoveProps = { main: string; proxy: string; assetId?: string };
export const RemoveTradingAccount = ({
  tradingAccount,
  fundWallet,
  onRemoveFromDevice,
  onRemoveFromChain,
  onCancel,
  loading,
  selectedExtension,
  errorMessage,
  errorTitle,
  availableOnDevice,
  enabledExtensionAccount = false,
}: {
  tradingAccount: TradeAccount;
  fundWallet?: ExtensionAccount;
  onRemoveFromDevice: () => void;
  onRemoveFromChain?: (props: RemoveProps) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
  selectedExtension?: (typeof ExtensionsArray)[0];
  errorTitle?: string;
  errorMessage?: string;
  availableOnDevice?: boolean;
  enabledExtensionAccount?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [feeToken, setFeeToken] = useState<FeeAssetReserve | null>(null);

  const [state, setState] = useState({
    removeDevice: false,
    removeBlockchain: false,
  });
  const onOpenModal = () => setOpen(true);

  const disableButton = useMemo(
    () => !Object.values(state).some((item) => item),
    [state]
  );

  const handleRemoveBlockchain = useCallback(
    async (e: RemoveProps) => {
      await onRemoveFromChain?.({
        ...e,
        assetId: feeToken?.id,
      });
      setOpen(false);
      onCancel();
    },
    [onCancel, onRemoveFromChain, feeToken?.id]
  );

  const handleRemoveDevice = useCallback(() => {
    onRemoveFromDevice?.();
    onCancel();
  }, [onCancel, onRemoveFromDevice]);

  const removeProps = useMemo(
    () => ({
      main: fundWallet?.address ?? "",
      proxy: tradingAccount.address ?? "",
    }),
    [fundWallet?.address, tradingAccount.address]
  );

  const { onRemoveProxyAccountOcex } = useCall();
  return (
    <Fragment>
      <ConfirmTransaction
        open={open}
        onOpenChange={setOpen}
        action={async () => await handleRemoveBlockchain(removeProps)}
        actionLoading={!!loading}
        feeToken={feeToken}
        onSetFeeToken={setFeeToken}
        extrinsicFn={() =>
          onRemoveProxyAccountOcex([tradingAccount.address ?? ""])
        }
        sender={tradingAccount.address}
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
              address={tradingAccount?.address ?? ""}
              name={tradingAccount?.meta?.name as string}
              type="Browser"
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
            onClick={state.removeBlockchain ? onOpenModal : handleRemoveDevice}
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
