import { ChevronDownIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Dropdown,
  Typography,
  Illustrations,
  Interaction,
} from "@polkadex/ux";
import { TradeAccount } from "@orderbook/core/providers/types";

import { TradingAccountCard, GenericHorizontalCard } from "../ReadyToUse";

export const TradingAccountSuccessfull = ({
  tradingAccount,
  onClose,
  onOpenMnemonic,
  onDownloadJson,
  onDownloadPdf,
}: {
  tradingAccount?: TradeAccount;
  onClose: () => void;
  onOpenMnemonic: () => void;
  onDownloadJson: (e: TradeAccount) => void;
  onDownloadPdf: () => void;
}) => {
  return (
    <Interaction>
      <Interaction.Content className="flex flex-col gap-6 flex-1 mb-4">
        <div className="flex flex-col items-center text-center gap-5">
          <div className="max-w-[8rem]">
            <Illustrations.Successfull className="max-w-[6rem] w-full " />
          </div>
          <div className="flex flex-col gap-2">
            <Typography.Text bold size="xl">
              New Trading account created!
            </Typography.Text>
            <Typography.Text variant="primary">
              You’re set to trade on Orderbook! Transfer funds to your trading
              account to start trading.
            </Typography.Text>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Typography.Text variant="secondary" size="xs">
            Trading account details
          </Typography.Text>
          <div className="flex flex-col gap-2">
            <TradingAccountCard
              address={tradingAccount?.address as string}
              name={tradingAccount?.meta?.name as string}
              type="Browser"
            />
            <GenericHorizontalCard title="Download file" icon="Download">
              <Dropdown>
                <Dropdown.Trigger
                  asChild
                  className="[&[data-state=open]>button>svg]:rotate-180"
                >
                  <Button.Solid appearance="secondary" size="sm">
                    Download as
                    <ChevronDownIcon className="h-3 w-3 ml-1 transition-transform duration-300 text-primary" />
                  </Button.Solid>
                </Dropdown.Trigger>
                <Dropdown.Content>
                  <Dropdown.Item onClick={() => onDownloadPdf?.()}>
                    PDF
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() =>
                      tradingAccount && onDownloadJson(tradingAccount)
                    }
                  >
                    JSON
                  </Dropdown.Item>
                </Dropdown.Content>
              </Dropdown>
            </GenericHorizontalCard>
            <GenericHorizontalCard title="Mnemonic seed" icon="Mnemonic">
              <Button.Solid
                appearance="secondary"
                size="sm"
                onClick={onOpenMnemonic}
              >
                Show
              </Button.Solid>
            </GenericHorizontalCard>
          </div>
        </div>
      </Interaction.Content>
      <Interaction.Footer>
        <Interaction.Action>Transfer funds</Interaction.Action>
        <Interaction.Close onClick={onClose}>Close</Interaction.Close>
      </Interaction.Footer>
    </Interaction>
  );
};