// TODO: REPLACE TESTING PROVIDER

import { useExtensionAccounts, useExtensions } from "@polkadex/react-providers";
import { useCallback, useMemo } from "react";
import { TradeAccount } from "@orderbook/core/providers/types";
import { Authorization, ConnectWallet, Multistep, Wallets } from "@polkadex/ux";

import { ConnectTradingAccount } from "../ConnectWallet/connectTradingAccount";
import { ImportTradingAccount } from "../ConnectWallet/importTradingAccount";
import { RemoveTradingAccount } from "../ConnectWallet/removeTradingAccount";
import { ConnectTradingAccountCard } from "../ReadyToUse/connectTradingAccountCard";

import { SwitchKeys } from ".";

import { useConnectWallet } from "@/hooks";

export type ConnectKeys =
  | "ConnectAuthorization"
  | "ConnectWalletOrderbook"
  | "ConnectFundingWallets"
  | "ConnectTradingAccount"
  | "RemoveTradingAccount"
  | "ImportTradingAccount";

export const Connect = ({
  onClose,
  onNext,
}: {
  onClose: () => void;
  onNext: (v: SwitchKeys) => void;
}) => {
  const {
    selectedExtension,
    proxiesLoading,
    selectedWallet,
    onSelectWallet,
    onSelectExtension,
    proxiesSuccess,
    proxiesAccounts,
    localTradingAccounts,
    onSelectTradingAccount,
    onImportFromFile,
    importFromFileStatus,
    onRemoveTradingAccountFromDevice,
    onSetTempTrading,
    tempTrading,
  } = useConnectWallet();

  const sourceId = selectedExtension?.id;
  const hasAccount = !!proxiesAccounts?.length;

  const { extensionsStatus } = useExtensions();
  const { connectExtensionAccounts, extensionAccounts } =
    useExtensionAccounts();

  const walletsFiltered = useMemo(
    () => extensionAccounts?.filter(({ source }) => source === sourceId),
    [extensionAccounts, sourceId]
  );

  const onRedirect = useCallback(
    () =>
      selectedWallet ? onNext(hasAccount ? "ExistingUser" : "NewUser") : null,
    [selectedWallet, onNext, hasAccount]
  );

  return (
    <Multistep.Interactive resetOnUnmount>
      {(props) => (
        <>
          <Multistep.Trigger>
            <ConnectWallet
              key="ConnectWalletOrderbook"
              installedExtensions={extensionsStatus}
              onConnectProvider={(e) => onSelectExtension?.(e)}
              onBack={onClose}
              onConnectCallback={() => props?.onPage("Authorization", true)}
            >
              <ConnectTradingAccountCard
                tradingAccountLentgh={localTradingAccounts?.length ?? 0}
                onOpenInteraction={() =>
                  props?.onPage("ConnectTradingAccount", true)
                }
              />
            </ConnectWallet>
          </Multistep.Trigger>
          <Multistep.Content>
            <Authorization
              key="ConnectAuthorization"
              onAction={async () =>
                await connectExtensionAccounts(selectedExtension?.id as string)
              }
              extensionIcon={selectedExtension?.id as string}
              extensionName={selectedExtension?.title}
              onActionCallback={() => props?.onPage("ConnectFundingWallets")}
              onClose={props?.onReset}
            />
            <Wallets
              key="ConnectFundingWallets"
              wallets={walletsFiltered}
              loading={!!proxiesLoading}
              success={!!proxiesSuccess}
              onSelectWallet={(e) => onSelectWallet?.(e)}
              onTryAgain={() =>
                selectedExtension && onSelectExtension?.(selectedExtension)
              }
              onRefresh={async () =>
                await connectExtensionAccounts(
                  selectedExtension?.title as string
                )
              }
              onClose={props?.onReset}
              onRedirect={onRedirect}
            />
            <ConnectTradingAccount
              key="ConnectTradingAccount"
              accounts={localTradingAccounts}
              onSelect={(e) =>
                onSelectTradingAccount?.({ tradeAddress: e.address })
              }
              onRemove={(e) => onSetTempTrading?.(e)}
              onClose={() => props?.onReset()}
              onImport={() => props?.onPage("ImportTradingAccount")}
              onSelectCallback={onClose}
              onRemoveCallback={() => props?.onPage("RemoveTradingAccount")}
            />
            <ImportTradingAccount
              key="ImportTradingAccount"
              onImport={async (e) => await onImportFromFile?.(e)}
              onRedirect={() => props?.onPage("ConnectTradingAccount")}
              onClose={() => props?.onPage("ConnectTradingAccount")}
              loading={importFromFileStatus === "loading"}
            />
            <RemoveTradingAccount
              key="RemoveTradingAccount"
              tradingAccount={tempTrading as TradeAccount}
              onRemoveFromDevice={() =>
                onRemoveTradingAccountFromDevice?.(
                  tempTrading?.address as string
                )
              }
              selectedExtension={selectedExtension}
              onCancel={() => props?.onPage("ConnectTradingAccount")}
            />
          </Multistep.Content>
        </>
      )}
    </Multistep.Interactive>
  );
};
