import { Accordion, Interaction, Typography } from "@polkadex/ux";
import { TradeAccount } from "@orderbook/core/providers/types";

import { RemoveWalletCard } from "../ReadyToUse";

export const TradingAccountList = ({
  tradingAccounts,
  onRemove,
  onClose,
  onRemoveCallback,
}: {
  tradingAccounts?: string[];
  onRemove: (e: TradeAccount) => void;
  onClose: () => void;
  onRemoveCallback: () => void;
}) => {
  return (
    <Interaction>
      <Interaction.Content className="flex flex-col gap-6 flex-1">
        <Accordion type="single" defaultValue="accordion1">
          <Accordion.Item value="accordion1">
            <Accordion.Trigger>
              <Typography.Text variant="secondary">
                Trading accounts
              </Typography.Text>
            </Accordion.Trigger>
            <Accordion.Content>
              <div className="flex flex-col gap-4">
                {tradingAccounts?.map((v) => {
                  const tradingAccount = {
                    address: v,
                    meta: {
                      name: "Trading Account",
                    },
                  };
                  return (
                    <RemoveWalletCard
                      key={v}
                      address={v}
                      showTooltip={tradingAccounts.length === 1}
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
