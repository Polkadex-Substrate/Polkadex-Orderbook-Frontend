import { useEffect, useState } from "react";
import { Interaction, Typography } from "@polkadex/ux";
import { TradeAccount } from "@orderbook/core/providers/types";
import { ExtensionAccount } from "@polkadex/react-providers";

import { GenericSelectCard, TradingAccountCard } from "../ReadyToUse";

export const RemoveTradingAccount = ({
  tradingAccount,
  fundWallet,
  onRemoveFromDevice,
  onRemoveFromChain,
  onCancel,
}: {
  tradingAccount?: TradeAccount;
  fundWallet?: ExtensionAccount;
  onRemoveFromDevice: (e: string) => void;
  onRemoveFromChain?: (e: string) => void;
  onCancel: () => void;
}) => {
  const [state, setState] = useState("");

  useEffect(() => {
    if (!tradingAccount) onCancel();
  }, [tradingAccount, onCancel]);

  return (
    <Interaction className="gap-10">
      <Interaction.Content className="flex flex-col gap-1 flex-1">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col text-center items-center gap-1">
            <Typography.Text bold size="xl">
              Remove trading account
            </Typography.Text>
            <Typography.Paragraph variant="primary">
              Are you sure you want
              <span className="text-current">
                {" "}
                remove this trading account from your device?{" "}
              </span>
              Don`t worry your funds are safe in your funding account.
            </Typography.Paragraph>
          </div>
          <TradingAccountCard
            address={tradingAccount?.address ?? "0x0000000"}
            name={tradingAccount?.meta?.name as string}
            type="Browser"
          />
          <div className="flex flex-col gap-2">
            <GenericSelectCard
              title="Remove from your device"
              icon="Device"
              checked={state === "Device" || state === "Blockchain"}
              onChange={() =>
                setState((prev) => (prev === "Device" ? "" : "Device"))
              }
            />
            <GenericSelectCard
              title="Remove  from blockchain"
              icon="Blockchain"
              checked={state === "Blockchain"}
              onChange={() =>
                setState((prev) => (prev === "Blockchain" ? "" : "Blockchain"))
              }
              disabled={!fundWallet}
            />
          </div>
        </div>
      </Interaction.Content>
      <Interaction.Footer>
        <Interaction.Action
          onClick={() => {
            state === "Blockchain"
              ? onRemoveFromChain?.(tradingAccount?.address as string)
              : onRemoveFromDevice(tradingAccount?.address as string);
          }}
          disabled={!state}
        >
          Yes, remove account
        </Interaction.Action>
        <Interaction.Close onClick={onCancel}>Cancel</Interaction.Close>
      </Interaction.Footer>
    </Interaction>
  );
};
