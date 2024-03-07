import {
  RiAddLine,
  RiAlertLine,
  RiArrowDownSLine,
  RiArrowLeftRightLine,
  RiInformationLine,
  RiMore2Line,
  RiShutDownLine,
} from "@remixicon/react";
import { TradeAccount } from "@orderbook/core/providers/types";
import { ExtensionAccount } from "@polkadex/react-providers";
import {
  Button,
  Dropdown,
  Typography,
  Illustrations,
  Separator,
  PopConfirm,
} from "@polkadex/ux";
import { KeyringPair } from "@polkadot/keyring/types";
import { useState } from "react";

import { AccountCard } from "../ReadyToUse";

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

  const enableDropdown = localTradingAccounts?.length >= 2;
  return (
    <div className="flex flex-col flex-1 md:w-[23rem] bg-backgroundBase rounded-sm max-sm:w-[90vw]">
      <div className="flex flex-col gap-6 p-4 border-b border-primary bg-level-0">
        <div className="flex items-center justify-between">
          <Typography.Text appearance="secondary" size="sm">
            Funding account
          </Typography.Text>
          <PopConfirm>
            <PopConfirm.Trigger asChild>
              <Button.Icon size="sm" variant="light" appearance="danger">
                <RiShutDownLine className="w-full h-full" />
              </Button.Icon>
            </PopConfirm.Trigger>
            <PopConfirm.Content>
              <PopConfirm.Title>Logout</PopConfirm.Title>
              <PopConfirm.Description>
                Are you sure you want to disconnect your account?
              </PopConfirm.Description>
              <PopConfirm.Close>Cancel</PopConfirm.Close>
              <PopConfirm.Button onClick={onLogout}>Logout</PopConfirm.Button>
            </PopConfirm.Content>
          </PopConfirm>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <AccountCard
              name={fundWallet?.name ?? "Wallet not present"}
              address={fundWallet?.address ?? "0x0000000000000"}
              source={fundWallet?.source}
              hoverable={false}
              present={fundWalletPresent}
              addressLength={8}
              largeText
            >
              <Button.Solid
                appearance="secondary"
                size="sm"
                className="flex items-center gap-1"
                onClick={onSwitch}
              >
                <RiArrowLeftRightLine
                  name="Exchange"
                  className="w-3 h-3 text-primary"
                />
                Switch
              </Button.Solid>
            </AccountCard>
          </div>
          {!fundWalletPresent && (
            <div className="flex flex-col gap-2">
              <Button.Solid appearance="tertiary" onClick={onConnectWallet}>
                Connect Wallet
              </Button.Solid>
              <div className="flex items-center gap-2">
                <RiInformationLine className="w-4 h-4 text-attention-base" />
                <Typography.Paragraph
                  appearance="primary"
                  className=" whitespace-normal"
                  size="xs"
                >
                  <span className="text-attention-base">(Optional)</span> Your
                  funding account is only required for signing transactions and
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
          <div className="flex flex-col gap-2 group">
            <div className="flex gap-3">
              <Button.Icon
                onClick={onActions}
                variant="outline"
                className="h-auto bg-level-3"
              >
                <RiAddLine className="w-6 h-6" />
              </Button.Icon>
              <Dropdown open={enableDropdown && state} onOpenChange={setState}>
                <Dropdown.Trigger
                  asChild
                  className="flex justify-between items-center gap-2 flex-1 py-3 [&[data-state=open]>div>svg]:rotate-180"
                >
                  <div>
                    <AccountCard
                      name={tradeAccount?.meta?.name}
                      address={tradeAccount?.address as string}
                      withIcon={false}
                      hoverable={false}
                    >
                      {enableDropdown && (
                        <RiArrowDownSLine className="h-3 w-3 transition-transform duration-300 text-primary" />
                      )}
                    </AccountCard>
                  </div>
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
                          <Typography.Text
                            appearance="secondary"
                            size="xs"
                            className="whitespace-nowrap"
                          >
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
            <div className="invisible h-0 group-hover:visible group-hover:h-auto">
              <div className="flex gap-4 bg-attention-base/10 p-3 rounded-md">
                <div className="mt-1">
                  <RiAlertLine className="text-attention-base w-4 h-4" />
                </div>
                <div className="flex flex-col gap-1">
                  <Typography.Text size="sm" bold appearance="attention">
                    Warning!
                  </Typography.Text>
                  <Typography.Paragraph size="sm">
                    Please don&apos;t transfer tokens directly to the trading
                    account, as this will result in the loss of your tokens.
                  </Typography.Paragraph>
                </div>
              </div>
            </div>
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
              <div className="flex items-center justify-around flex-1 gap-1">
                <Typography.Text appearance="primary">
                  Already have a trading account?
                </Typography.Text>
                <Button.Light
                  onClick={onImportTradingAccount}
                  appearance="primary"
                  size="sm"
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
              <RiMore2Line className="text-primary group-hover:text-current duration-300 transition-colors" />
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
