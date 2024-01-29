import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import {
  ArrowsRightLeftIcon,
  ChevronDownIcon,
  PlusIcon,
  PowerIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import { TradeAccount } from "@orderbook/core/providers/types";
import { ExtensionAccount } from "@polkadex/react-providers";
import {
  Button,
  Dropdown,
  Typography,
  AccountCard,
  Illustrations,
  Separator,
} from "@polkadex/ux";
import { KeyringPair } from "@polkadot/keyring/types";
import { useState } from "react";

export const Profile = ({
  onCreateTradingAccount,
  onSelectTradingAccount,
  onImportTradingAccount,
  onLogout,
  onActions,
  onRemoveCallback,
  onExportBrowserAccountCallback,
  onExportBrowserAccount,
  tradingWalletPresent,
  onTempBrowserAccount,
  fundWalletPresent,
  fundWallet,
  tradeAccount,
  onSwitch,
  localTradingAccounts,
  mainProxiesAccounts,
  onConnectWallet,
}: {
  onCreateTradingAccount: () => void;
  onSelectTradingAccount: (value: string) => void;
  onImportTradingAccount: () => void;
  onLogout: () => void;
  onActions: () => void;
  onSwitch: () => void;
  onTempBrowserAccount: (e: TradeAccount) => void;
  onRemoveCallback: () => void;
  onExportBrowserAccountCallback: () => void;
  onExportBrowserAccount: (account: KeyringPair) => void;
  tradingWalletPresent?: boolean;
  fundWalletPresent?: boolean;
  fundWallet?: ExtensionAccount;
  tradeAccount?: TradeAccount;
  localTradingAccounts: TradeAccount[];
  mainProxiesAccounts: string[];
  onConnectWallet: () => void;
}) => {
  const [state, setState] = useState(false);
  const linkedBrowserAccounts = localTradingAccounts?.filter(({ address }) =>
    mainProxiesAccounts.includes(address)
  );
  const otherBrowserAccounts = localTradingAccounts?.filter(
    ({ address }) => !mainProxiesAccounts.includes(address)
  );

  return (
    <div className="flex flex-col sm:w-full md:w-[23rem] bg-level-3 border border-primary rounded-lg">
      <div className="flex flex-col gap-6 p-4 border-b border-primary bg-level-2">
        <div className="flex items-center justify-between">
          <Typography.Text appearance="secondary" size="sm">
            Funding wallet
          </Typography.Text>
          <Button.Icon
            onClick={onLogout}
            size="sm"
            variant="light"
            appearance="danger"
          >
            <PowerIcon />
          </Button.Icon>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <AccountCard.Inverted
              name={fundWallet?.name ?? "Wallet not present"}
              address={fundWallet?.address ?? "0x0000000000000"}
              withIcon={false}
              hoverable={false}
              present={fundWalletPresent}
            >
              <Button.Solid
                appearance="secondary"
                size="sm"
                className="flex items-center gap-1"
                onClick={onSwitch}
              >
                <ArrowsRightLeftIcon
                  name="Exchange"
                  className="w-3 h-3 text-primary"
                />
                Switch
              </Button.Solid>
            </AccountCard.Inverted>
          </div>
          {!fundWalletPresent && (
            <div className="flex flex-col gap-2">
              <Button.Solid appearance="tertiary" onClick={onConnectWallet}>
                Connect Wallet
              </Button.Solid>
              <div className="flex items-center gap-2">
                <InformationCircleIcon className="w-7 h-7 text-attention-base" />
                <Typography.Paragraph appearance="primary" size="xs">
                  <span className="text-attention-base">(Optional)</span> Your
                  funding wallet is only required for signing transactions and
                  account management.
                </Typography.Paragraph>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-6 p-4">
        <Typography.Text appearance="secondary" size="sm">
          Trading account
        </Typography.Text>
        {tradingWalletPresent ? (
          <div className="flex gap-3">
            <Button.Icon
              onClick={onActions}
              variant="outline"
              className="h-auto bg-level-4"
            >
              <PlusIcon className="w-6 h-6" />
            </Button.Icon>
            <Dropdown open={state} onOpenChange={setState}>
              <Dropdown.Trigger
                asChild
                className="flex justify-between items-center gap-2 flex-1 py-3 [&[data-state=open]>div>svg]:rotate-180"
              >
                <AccountCard.Inverted
                  name={tradeAccount?.meta?.name}
                  address={tradeAccount?.address as string}
                  withIcon={false}
                  hoverable={false}
                >
                  <ChevronDownIcon className="h-3 w-3 transition-transform duration-300 text-primary" />
                </AccountCard.Inverted>
              </Dropdown.Trigger>
              <Dropdown.Content className="min-w-[20rem]">
                <div className="flex flex-col gap-0 p-2 rounded-md">
                  <Typography.Text appearance="secondary" size="sm">
                    Available trading account(s)
                  </Typography.Text>
                  <div
                    className="flex flex-col max-h-[15rem] overflow-hidden hover:overflow-auto"
                    style={{ scrollbarGutter: "stable" }}
                  >
                    {linkedBrowserAccounts?.map((v) => (
                      <TradingAccountCard
                        key={v.address}
                        account={v}
                        onExportBrowserAccount={onExportBrowserAccount}
                        onExportBrowserAccountCallback={
                          onExportBrowserAccountCallback
                        }
                        onRemoveCallback={onRemoveCallback}
                        onSelectTradingAccount={onSelectTradingAccount}
                        onSetState={setState}
                        onTempBrowserAccount={onTempBrowserAccount}
                      />
                    ))}

                    {otherBrowserAccounts?.length > 0 && (
                      <div className="flex items-center gap-2 mr-2">
                        <Separator.Horizontal className="bg-level-5" />
                        <Typography.Text appearance="secondary" size="xs">
                          from other funding account(s)
                        </Typography.Text>
                      </div>
                    )}

                    {otherBrowserAccounts?.map((v) => (
                      <TradingAccountCard
                        key={v.address}
                        account={v}
                        onExportBrowserAccount={onExportBrowserAccount}
                        onExportBrowserAccountCallback={
                          onExportBrowserAccountCallback
                        }
                        onRemoveCallback={onRemoveCallback}
                        onSelectTradingAccount={onSelectTradingAccount}
                        onSetState={setState}
                        onTempBrowserAccount={onTempBrowserAccount}
                      />
                    ))}
                  </div>
                </div>
              </Dropdown.Content>
            </Dropdown>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4 items-center">
              <div className="max-w-[13rem]">
                <Illustrations.NoWallets className="max-w-[8rem] w-full text-disabled" />
              </div>
              <div className="flex flex-col text-center items-center">
                <Typography.Text size="sm">
                  {linkedBrowserAccounts.length > 0
                    ? "No trading account selected."
                    : "No trading account avaliable in browser."}
                </Typography.Text>
                <Typography.Text appearance="primary" size="xs">
                  Try refreshing the page or creating a new one.
                </Typography.Text>
              </div>
            </div>
            <div className="flex flex-col gap-3 text-center">
              <Button.Solid onClick={onCreateTradingAccount}>
                Create new account
              </Button.Solid>
              <div className="flex items-center self-center gap-1">
                <Typography.Text appearance="primary">
                  Already have a trading account?
                </Typography.Text>
                <Button.Light
                  onClick={onImportTradingAccount}
                  appearance="primary"
                >
                  Select / Import
                </Button.Light>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const TradingAccountCard = ({
  account,
  onSelectTradingAccount,
  onTempBrowserAccount,
  onRemoveCallback,
  onExportBrowserAccount,
  onExportBrowserAccountCallback,
  onSetState,
}: {
  account: TradeAccount;
  onSelectTradingAccount: (value: string) => void;
  onTempBrowserAccount: (e: TradeAccount) => void;
  onRemoveCallback: () => void;
  onExportBrowserAccountCallback: () => void;
  onExportBrowserAccount: (account: KeyringPair) => void;
  onSetState: (value: boolean) => void;
}) => (
  <div
    className="flex items-center gap-5 justify-between"
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      onSelectTradingAccount(account.address);
      onSetState(false);
    }}
  >
    <AccountCard.Inverted
      name={account.meta.name}
      address={account.address}
      withIcon={false}
    >
      <div className="flex gap-1">
        <Dropdown>
          <Dropdown.Trigger>
            <Button.Icon asChild size="sm" variant="ghost">
              <EllipsisVerticalIcon className="text-primary group-hover:text-current duration-300 transition-colors" />
            </Button.Icon>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onTempBrowserAccount(account);
                onRemoveCallback();
                onSetState(false);
              }}
            >
              Remove
            </Dropdown.Item>
            <Dropdown.Item
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                try {
                  if (account.isLocked) account.unlock("");
                  onExportBrowserAccount(account);
                } catch (error) {
                  onTempBrowserAccount(account);
                  onExportBrowserAccountCallback();
                }
                onSetState(false);
              }}
            >
              Export as JSON
            </Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      </div>
    </AccountCard.Inverted>
  </div>
);
