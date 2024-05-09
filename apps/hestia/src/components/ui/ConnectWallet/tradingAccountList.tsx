import { Accordion, Interaction, Typography } from "@polkadex/ux";
import { TradeAccount } from "@orderbook/core/providers/types";
import { MouseEvent } from "react";
import { ExtensionAccount } from "@polkadex/react-providers";

import { RemoveWalletCard } from "../ReadyToUse";

export const TradingAccountList = ({
  fundWallet,
  tradingAccounts,
  browserAccounts,
  onRemove,
  onClose,
  onRemoveCallback,
}: {
  fundWallet?: ExtensionAccount;
  tradingAccounts?: string[];
  browserAccounts: TradeAccount[];
  onRemove: (e: TradeAccount) => void;
  onClose: (e: MouseEvent<HTMLButtonElement>) => void;
  onRemoveCallback: () => void;
}) => {
  return (
    <Interaction className="w-full">
      <Interaction.Title onClose={{ onClick: onClose }}>
        Registered trading accounts
      </Interaction.Title>
      <Interaction.Content className="flex flex-col gap-6 flex-1">
        <Accordion type="single" defaultValue="accordion1" collapsible>
          <Accordion.Item value="accordion1">
            <Accordion.Trigger className="pb-4">
              <Typography.Text appearance="secondary">
                Trading accounts
              </Typography.Text>
            </Accordion.Trigger>
            <Accordion.Content>
              <div className="flex flex-col gap-4">
                {tradingAccounts?.map((v) => {
                  const account = browserAccounts?.find(
                    (acc) => acc.address === v
                  );
                  const tradingAccount = {
                    address: v,
                    meta: {
                      name: "Trading Account",
                    },
                  };
                  return (
                    <RemoveWalletCard
                      key={v}
                      name={account?.meta?.name}
                      address={v}
                      showTooltip={
                        // Avoid removing trading account if it have same address as funding account
                        fundWallet?.address === v
                          ? true
                          : tradingAccounts.length === 1
                      }
                      onClick={() => {
                        onRemove(tradingAccount as TradeAccount);
                        onRemoveCallback();
                      }}
                    />
                  );
                })}
              </div>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </Interaction.Content>
      <Interaction.Footer>
        <Interaction.Close onClick={onClose}>Back</Interaction.Close>
      </Interaction.Footer>
    </Interaction>
  );
};
