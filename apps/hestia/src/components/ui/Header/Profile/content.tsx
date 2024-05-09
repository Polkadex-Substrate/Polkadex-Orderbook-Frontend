"use client";

import { Multistep } from "@polkadex/ux";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import { useProfile } from "@orderbook/core/providers/user/profile";
import { useMemo } from "react";
import {
  ExtensionAccount,
  useExtensionAccounts,
  useExtensions,
} from "@polkadex/react-providers";
import { useConnectWalletProvider } from "@orderbook/core/providers/user/connectWalletProvider";

import { Profile } from "../../ConnectWallet/profile";
import { ConnectExtensionAccount } from "../../ConnectWallet/connnectExtensionAccount";
import { FundAccount } from "../../ConnectWallet/fundAccount";
import { Authorization } from "../../ConnectWallet/authorization";

export const Content = () => {
  const {
    selectedWallet,
    onLogout,
    selectedExtension,
    onSelectExtension,
    extensionAccountPresent,
  } = useConnectWalletProvider();
  const sourceId = selectedExtension?.id;
  const { onToogleConnectExtension, onToogleConnectTrading } =
    useSettingsProvider();
  const { extensionsStatus } = useExtensions();
  const { connectExtensionAccounts, extensionAccounts } =
    useExtensionAccounts();
  const {
    selectedAddresses: { mainAddress },
  } = useProfile();

  const selectedFundingWallet = useMemo(
    () =>
      selectedWallet ||
      ({
        name: "Wallet not present",
        address: mainAddress,
      } as ExtensionAccount),
    [selectedWallet, mainAddress]
  );

  const walletsFiltered = useMemo(
    () => extensionAccounts?.filter(({ source }) => source === sourceId),
    [extensionAccounts, sourceId]
  );

  const isPresent = useMemo(
    () =>
      extensionAccounts?.some(
        (account) => account.address === selectedFundingWallet.address
      ),
    [extensionAccounts, selectedFundingWallet.address]
  );

  return (
    <Multistep.Interactive className="h-auto max-h-screen">
      {(props) => (
        <>
          <Multistep.Trigger>
            <Profile
              onSwitch={onToogleConnectExtension}
              onLogout={() => onLogout?.()}
              fundWalletPresent={extensionAccountPresent}
              fundWallet={selectedFundingWallet}
              onConnectWallet={() => props?.onPage("ConnectWallet", true)}
              onConnectTradingAccount={onToogleConnectTrading}
            />
          </Multistep.Trigger>
          <Multistep.Content>
            <ConnectExtensionAccount
              key="ConnectWallet"
              installedExtensions={extensionsStatus}
              onConnectProvider={(e) => onSelectExtension?.(e)}
              onClose={() => props?.onChangeInteraction(false)}
              onConnectCallback={() => props?.onPage("Authorization", true)}
            />
            <Authorization
              key="ConnectAuthorization"
              onAction={async () =>
                await connectExtensionAccounts(selectedExtension?.id as string)
              }
              extensionIcon={selectedExtension?.id as string}
              extensionName={selectedExtension?.title}
              onActionCallback={() => props?.onPage("FundAccount")}
              onClose={props?.onReset}
            />
            <FundAccount
              key="FundAccount"
              extensionAccounts={walletsFiltered}
              selectdAccount={selectedFundingWallet}
              onClose={() => props?.onChangeInteraction(false)}
              isPresent={isPresent}
              selectedExtension={selectedExtension}
            />
          </Multistep.Content>
        </>
      )}
    </Multistep.Interactive>
  );
};
