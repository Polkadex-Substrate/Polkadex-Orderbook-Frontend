"use client";

import { ExtensionAccount } from "@polkadex/react-providers";
import {
  Interaction,
  Typography,
  InteractionProps,
  Illustrations,
  useInteractableProvider,
} from "@polkadex/ux";
import classNames from "classnames";

import { AccountCard } from "./accountCard";

interface ExtensionAccountsProps extends InteractionProps {
  extensionAccounts: ExtensionAccount[];
  onSelectExtensionAccount: (v: ExtensionAccount) => void;
  onClose: () => void;
  onResetExtension: () => void;
}
export const ExtensionAccounts = ({
  extensionAccounts,
  onSelectExtensionAccount,
  onClose,
  onResetExtension,
  ...props
}: ExtensionAccountsProps) => {
  const { onReset } = useInteractableProvider();

  return (
    <Interaction className="w-full" {...props}>
      {!!extensionAccounts && (
        <Interaction.Title onClose={{ onClick: onReset }}>
          Select funding account
        </Interaction.Title>
      )}
      <Interaction.Content withPadding={false}>
        {!extensionAccounts ? (
          <div className="flex flex-col gap-5 items-center px-7 py-8">
            <div className="max-w-[10rem]">
              <Illustrations.WalletNotFound className="w-full text-disabled" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <Typography.Text bold size="xl">
                No wallets found
              </Typography.Text>
              <Typography.Text appearance="primary">
                Oops, it looks like you don&apos;t have any wallet.
              </Typography.Text>
            </div>
          </div>
        ) : (
          <div
            className={classNames(
              extensionAccounts?.length > 4 && "border-b border-primary"
            )}
          >
            <Typography.Text appearance="secondary" size="xs" className="px-7">
              Available wallets
            </Typography.Text>
            <div className="flex flex-col px-3 max-h-[200px] overflow-hidden hover:overflow-auto">
              {extensionAccounts.map((value, i) => (
                <AccountCard
                  key={i}
                  name={value.name}
                  address={value.address}
                  onClick={() => onSelectExtensionAccount(value)}
                />
              ))}
            </div>
          </div>
        )}
      </Interaction.Content>
      <Interaction.Footer>
        <Interaction.Close
          onClick={() => {
            onClose();
            onResetExtension();
            onReset();
          }}
        >
          Connect other wallet
        </Interaction.Close>
      </Interaction.Footer>
    </Interaction>
  );
};
