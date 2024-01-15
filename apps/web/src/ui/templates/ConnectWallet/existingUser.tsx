import { ChevronRightIcon } from "@heroicons/react/24/solid";
import {
  Typography,
  Icon,
  Illustrations,
  Interaction,
  Separator,
} from "@polkadex/ux";
import { TradeAccount } from "@orderbook/core/providers/types";
import classNames from "classnames";
import { KeyringPair } from "@polkadot/keyring/types";

import { GenericHorizontalCard, TradingAccountCard } from "../ReadyToUse";

export const ExistingUser = ({
  onClose,
  onReadMore,
  onBack,
  onCreate,
  onRecover,
  onTradingAccountList,
  accounts,
  registeredProxies,
  onSelect,
  onSelectCallback,
  onTempBrowserAccount,
  onRemoveCallback,
  onExportBrowserAccountCallback,
  onExportBrowserAccount,
}: {
  onClose: () => void;
  onReadMore: () => void;
  onCreate: () => void;
  onTradingAccountList: () => void;
  onRecover: () => void;
  onBack: () => void;
  accounts?: TradeAccount[];
  registeredProxies: string[];
  onSelect: (e: TradeAccount) => void;
  onSelectCallback: () => void;
  onRemoveCallback: () => void;
  onExportBrowserAccountCallback: () => void;
  onExportBrowserAccount: (account: KeyringPair) => void;
  onTempBrowserAccount: (e: TradeAccount) => void;
}) => {
  const hasTradingAccounts = !!accounts?.length;

  return (
    <Interaction className="gap-10 overflow-hidden">
      {hasTradingAccounts && (
        <Interaction.Title className="px-7" onClose={onClose}>
          Select a trading account
        </Interaction.Title>
      )}
      <Interaction.Content
        className="flex flex-col gap-1 flex-1"
        withPadding={false}
      >
        <div className="flex flex-col gap-8">
          {hasTradingAccounts ? (
            <div className="flex flex-col gap-3">
              <Typography.Text variant="secondary" size="xs" className="px-7">
                Available trading account(s)
              </Typography.Text>
              <div
                className={classNames(
                  accounts?.length > 1 &&
                    "border-b border-secondary overflow-hidden hover:overflow-auto",
                  "flex flex-col gap-3 max-h-[11rem] px-7"
                )}
                style={{ scrollbarGutter: "stable" }}
              >
                {accounts.map((value, i) => (
                  <TradingAccountCard
                    key={i}
                    address={value.address}
                    name={value.meta.name as string}
                    type="Browser"
                    onSelect={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onSelect(value);
                      onSelectCallback();
                    }}
                    onRemove={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onTempBrowserAccount(value);
                      onRemoveCallback();
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
            <>
              <div className="w-full px-7">
                <Illustrations.ExistingUserKey />
              </div>
              <div className="flex flex-col gap-5 px-7">
                <div className="flex flex-col gap-1">
                  <Typography.Text bold size="xl">
                    No trading account found in browser
                  </Typography.Text>
                  <Typography.Paragraph variant="primary">
                    You must have a trading account in browser to access
                    Orderbook. Import your current account or set up a new one.
                  </Typography.Paragraph>
                </div>
                <button
                  onClick={onReadMore}
                  className="flex items-center gap-2 text-primary-base"
                >
                  <Icon name="Wallet" className="w-4 h-4" />
                  <Typography.Text className="text-primary-base">
                    Read More
                  </Typography.Text>
                  <ChevronRightIcon className="w-3 h-3" />
                </button>
              </div>
            </>
          )}
          <div className="flex flex-col gap-2 px-7">
            {hasTradingAccounts && (
              <div className="flex items-center gap-2">
                <Separator.Horizontal className="bg-level-5" />
                <Typography.Text variant="secondary" size="xs">
                  More options
                </Typography.Text>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <GenericHorizontalCard
                title="Create new trading account"
                icon="Plus"
                onClick={onCreate}
              />
              <GenericHorizontalCard
                title="Recover trading account"
                icon="Recover"
                onClick={onRecover}
              />
              <GenericHorizontalCard
                title={`Registered trading accounts (${registeredProxies.length})`}
                icon="History"
                onClick={onTradingAccountList}
              />
            </div>
          </div>
        </div>
      </Interaction.Content>
      <Interaction.Footer>
        <Interaction.Action onClick={onClose}>
          Connect trading account later
        </Interaction.Action>
        <Interaction.Close onClick={onBack}>
          Connect other wallet
        </Interaction.Close>
      </Interaction.Footer>
    </Interaction>
  );
};
