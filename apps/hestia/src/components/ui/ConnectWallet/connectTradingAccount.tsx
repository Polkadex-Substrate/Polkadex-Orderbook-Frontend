import {
  Illustrations,
  Interaction,
  Separator,
  Typography,
} from "@polkadex/ux";
import { TradeAccount } from "@orderbook/core/providers/types";
import { KeyringPair } from "@polkadot/keyring/types";
import { PropsWithChildren } from "react";
import classNames from "classnames";

import { TradingAccountCard, GenericHorizontalCard } from "../ReadyToUse";

export const ConnectTradingAccount = ({
  accounts = [],
  onClose,
  onImport,
  onImportMnemonic,
  onSelect,
  onTempBrowserAccount,
  onSelectCallback,
  onRemoveCallback,
  onExportBrowserAccountCallback,
  onExportBrowserAccount,
  enabledExtensionAccount = false,
  children,
}: PropsWithChildren<{
  accounts?: TradeAccount[];
  onClose: () => void;
  onImport: () => void;
  onImportMnemonic: () => void;
  onSelect: (e: TradeAccount) => void;
  onTempBrowserAccount: (e: TradeAccount) => void;
  onSelectCallback: () => void;
  onRemoveCallback: () => void;
  onExportBrowserAccountCallback: () => void;
  onExportBrowserAccount: (account: KeyringPair) => void;
  enabledExtensionAccount?: boolean;
}>) => {
  return (
    <Interaction className="w-full md:min-w-[24rem] md:max-w-[24rem]">
      <Interaction.Title onClose={{ onClick: onClose }}>
        Select / Import Trading Account
      </Interaction.Title>
      <Interaction.Content withPadding={false}>
        <div className="flex flex-col gap-6">
          {accounts.length ? (
            <div className="flex flex-col gap-3">
              <Typography.Text
                appearance="secondary"
                size="sm"
                className="px-7"
              >
                Available trading account(s)
              </Typography.Text>
              <div
                className={classNames(
                  "flex flex-col gap-3 max-h-[10rem] px-7",
                  accounts?.length > 1 &&
                    "border-b border-primary overflow-hidden hover:overflow-auto pb-7 scrollbar-hide"
                )}
              >
                {accounts.map((value, i) => (
                  <TradingAccountCard
                    key={i}
                    address={value.address}
                    name={value.meta.name as string}
                    type="Browser"
                    enabledExtensionAccount={enabledExtensionAccount}
                    onRemove={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onTempBrowserAccount(value);
                      onRemoveCallback();
                    }}
                    onSelect={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onSelect(value);
                      onSelectCallback();
                    }}
                    onExport={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      try {
                        if (value.isLocked) value.unlock("");
                        onExportBrowserAccount(value);
                      } catch (error) {
                        onTempBrowserAccount(value);
                        onExportBrowserAccountCallback();
                      }
                    }}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed rounded-md border-primary px-7 py-6 flex flex-col gap-5 items-center">
              <div className="max-w-[13rem]">
                <Illustrations.WalletNotFound className="max-w-[10rem] w-full text-disabled" />
              </div>
              <div className="flex flex-col text-center items-center gap-1">
                <Typography.Text bold size="md">
                  No trading accounts found
                </Typography.Text>
                <Typography.Text appearance="primary">
                  Oops, it looks like you don&apos;t have any trading account.
                </Typography.Text>
              </div>
            </div>
          )}
          <div className="flex flex-col gap-2 px-7">
            <div className="flex items-center gap-2">
              <Separator.Horizontal className="bg-level-3" />
              <Typography.Text
                appearance="secondary"
                size="xs"
                className="whitespace-nowrap"
              >
                Or restore your trading account using
              </Typography.Text>
            </div>
            <div className="flex flex-col gap-2">
              <GenericHorizontalCard
                title="Google Drive"
                icon="GoogleDrive"
                disabled
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
                onClick={onImportMnemonic}
              >
                Import
              </GenericHorizontalCard>
              {children}
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
