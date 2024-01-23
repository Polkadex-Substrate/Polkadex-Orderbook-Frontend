import {
  Accordion,
  Typography,
  Illustrations,
  Interaction,
} from "@polkadex/ux";
import { TradeAccount } from "@orderbook/core/providers/types";

import { RemoveWalletCard } from "../ReadyToUse";

export const MaximumTradingAccount = ({
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
    <Interaction className="gap-10">
      <Interaction.Content className="flex flex-col gap-6 flex-1">
        <div className="py-6 flex flex-col gap-5 items-center text-center border-b border-primary pb-8">
          <div className="max-w-[8rem]">
            <Illustrations.Error className="max-w-[6rem] w-full" />
          </div>
          <div className="flex flex-col gap-2">
            <Typography.Text bold size="xl">
              Maximum 3 accounts allowed
            </Typography.Text>
            <Typography.Text variant="primary">
              Each Funding account within the Orderbook can be linked to a
              maximum of 3 distinct Trading accounts. Please delete one to
              continue.
            </Typography.Text>
          </div>
        </div>
        <Accordion type="multiple">
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
