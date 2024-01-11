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
  localTradingAccounts?: TradeAccount[];
  onConnectWallet: () => void;
}) => {
  const [state, setState] = useState(false);

  return (
    <div className="flex flex-col sm:w-full md:w-[23rem] bg-level-3 border border-primary rounded-lg">
      <div className="flex flex-col gap-6 p-4 border-b border-primary bg-level-2">
        <div className="flex items-center justify-between">
          <Typography.Text variant="secondary" size="sm">
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
                <Typography.Paragraph variant="primary" size="xs">
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
        <Typography.Text variant="secondary" size="sm">
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
                  <Typography.Text variant="secondary" size="sm">
                    Available trading account(s)
                  </Typography.Text>
                  <div
                    className="flex flex-col max-h-[15rem] overflow-hidden hover:overflow-auto"
                    style={{ scrollbarGutter: "stable" }}
                  >
                    {localTradingAccounts?.map((v) => (
                      <div
                        className="flex items-center gap-5 justify-between"
                        key={v.address}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          onSelectTradingAccount(v.address);
                          setState(false);
                        }}
                      >
                        <AccountCard.Inverted
                          name={v.meta.name}
                          address={v.address}
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
                                    onTempBrowserAccount(v);
                                    onRemoveCallback();
                                    setState(false);
                                  }}
                                >
                                  Remove
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    try {
                                      if (v.isLocked) v.unlock("");
                                      onExportBrowserAccount(v);
                                    } catch (error) {
                                      onTempBrowserAccount(v);
                                      onExportBrowserAccountCallback();
                                    }
                                    setState(false);
                                  }}
                                >
                                  Export as JSON
                                </Dropdown.Item>
                              </Dropdown.Content>
                            </Dropdown>
                          </div>
                        </AccountCard.Inverted>
                      </div>
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
                  No trading account detected.
                </Typography.Text>
                <Typography.Text variant="primary" size="xs">
                  Try refreshing the page or creating a new one.
                </Typography.Text>
              </div>
            </div>
            <div className="flex flex-col gap-3 text-center">
              <Button.Solid onClick={onCreateTradingAccount}>
                Create new account
              </Button.Solid>
              <div className="flex items-center self-center gap-1">
                <Typography.Text variant="primary">
                  Already have a trading account?
                </Typography.Text>
                <Button.Light
                  onClick={onImportTradingAccount}
                  appearance="primary"
                  className="px-2"
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
