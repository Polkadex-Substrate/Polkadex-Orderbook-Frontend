import { useCallback, useMemo, useState } from "react";
import { Interaction, Typography, Loading } from "@polkadex/ux";
import { TradeAccount } from "@orderbook/core/providers/types";
import { ExtensionAccount } from "@polkadex/react-providers";
import { ExtensionsArray } from "@polkadot-cloud/assets/extensions";

import { GenericSelectCard, TradingAccountCard } from "../ReadyToUse";

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
  onRemoveFromChain?: () => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
  selectedExtension?: (typeof ExtensionsArray)[0];
  errorTitle?: string;
  errorMessage?: string;
  availableOnDevice?: boolean;
  enabledExtensionAccount?: boolean;
}) => {
  const [state, setState] = useState({
    removeDevice: false,
    removeBlockchain: false,
  });

  const disableButton = useMemo(
    () => !Object.values(state).some((item) => item),
    [state]
  );

  const handleRemoveBlockchain = useCallback(async () => {
    await onRemoveFromChain?.();
    onCancel();
  }, [onCancel, onRemoveFromChain]);

  const handleRemoveDevice = useCallback(() => {
    onRemoveFromDevice?.();
    onCancel();
  }, [onCancel, onRemoveFromDevice]);

  return (
    <Loading.Processing
      logo={selectedExtension?.id as string}
      active={!!loading}
      errorTitle={errorTitle}
      errorMessage={errorMessage}
    >
      <Interaction>
        <Interaction.Content className="flex flex-col gap-1 flex-1">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col text-center items-center gap-1">
              <Typography.Text bold size="xl">
                Remove trading account
              </Typography.Text>
              <Typography.Paragraph appearance="primary">
                Are you sure you want
                <span className="text-current">
                  {" "}
                  remove this trading account from your device?{" "}
                </span>
                Don`t worry your funds are safe in your funding account.
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
            onClick={
              state.removeBlockchain
                ? handleRemoveBlockchain
                : handleRemoveDevice
            }
            disabled={disableButton}
          >
            Yes, remove account
          </Interaction.Action>
          <Interaction.Close onClick={onCancel}>Cancel</Interaction.Close>
        </Interaction.Footer>
      </Interaction>
    </Loading.Processing>
  );
};
