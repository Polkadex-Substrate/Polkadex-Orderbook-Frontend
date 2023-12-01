import {
  Illustrations,
  Interaction,
  Separator,
  Typography,
} from "@polkadex/ux";
import { TradeAccount } from "@orderbook/core/providers/types";

import { TradingAccountCard, GenericHorizontalCard } from "../ReadyToUse";

export const ConnectTradingAccount = ({
  accounts = [],
  onClose,
  onImport,
  onSelect,
  onRemove,
}: {
  accounts?: TradeAccount[];
  onClose: () => void;
  onImport: () => void;
  onSelect: (e: TradeAccount) => void;
  onRemove: (e: TradeAccount) => void;
}) => {
  return (
    <Interaction>
      <Interaction.Title onClose={onClose}>
        Select funding wallet
      </Interaction.Title>
      <Interaction.Content className="flex flex-col gap-1 flex-1">
        <div className="flex flex-col gap-6">
          {accounts.length ? (
            <div className="flex flex-col gap-3">
              <Typography.Text variant="secondary" size="xs">
                Available trading account(s)
              </Typography.Text>
              <div
                className="flex flex-col gap-3 max-h-[15rem] overflow-hidden hover:overflow-auto"
                style={{ scrollbarGutter: "stable" }}
              >
                {accounts.map((value, i) => (
                  <TradingAccountCard
                    key={i}
                    address={value.address}
                    name={value.meta.name as string}
                    type="Brower"
                    onRemove={(e) => {
                      e.stopPropagation();
                      onRemove(value);
                    }}
                    onSelect={(e) => {
                      e.stopPropagation();
                      onSelect(value);
                    }}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed rounded-md border-primary px-4 py-6 flex flex-col gap-5 items-center">
              <div className="max-w-[13rem]">
                <Illustrations.WalletNotFound className="max-w-[10rem] w-full text-disabled" />
              </div>
              <div className="flex flex-col text-center items-center gap-1">
                <Typography.Text bold size="md">
                  No wallets found
                </Typography.Text>
                <Typography.Text variant="primary">
                  Oops, it looks like you don&apos;t have any wallet.
                </Typography.Text>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Separator.Horizontal />
              <Typography.Text variant="secondary" size="xs">
                Or restore your trading account using
              </Typography.Text>
            </div>
            <div className="flex flex-col gap-2">
              <GenericHorizontalCard
                title="Google Drive"
                icon="GoogleDrive"
                onClick={() => window.alert("Connect")}
              >
                Connect
              </GenericHorizontalCard>
              <GenericHorizontalCard
                title="Import from my PC"
                icon="Folder"
                onClick={onImport}
              >
                Import
              </GenericHorizontalCard>
              <GenericHorizontalCard
                title="Import with Mnemonic"
                icon="Mnemonic"
                onClick={() => window.alert("Connect")}
              >
                Connect
              </GenericHorizontalCard>
            </div>
          </div>
        </div>
      </Interaction.Content>
      <Interaction.Footer>
        <Interaction.Close onClick={onClose}>Close</Interaction.Close>
      </Interaction.Footer>
    </Interaction>
  );
};
