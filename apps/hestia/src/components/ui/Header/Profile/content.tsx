import { Multistep } from "@polkadex/ux";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import { useProfile } from "@orderbook/core/providers/user/profile";
import { useMemo } from "react";
import {
  ExtensionAccount,
  useExtensionAccounts,
  useExtensions,
} from "@polkadex/react-providers";
import { TradeAccount } from "@orderbook/core/providers/types";
import { ExtensionsArray } from "@polkadot-cloud/assets/extensions";
import { useConnectWalletProvider } from "@orderbook/core/providers/user/connectWalletProvider";

import { Profile } from "../../ConnectWallet/profile";
import { NewTradingAccount } from "../../ConnectWallet/newTradingAccount";
import { ConnectTradingAccount } from "../../ConnectWallet/connectTradingAccount";
import { UserActions } from "../../ConnectWallet/userActions";
import { RemoveTradingAccount } from "../../ConnectWallet/removeTradingAccount";
import { ImportTradingAccount } from "../../ConnectWallet/importTradingAccount";
import { TradingAccountSuccessfull } from "../../ConnectWallet/tradingAccountSuccessfull";
import { TradingAccountMnemonic } from "../../ConnectWallet/tradingAccountMnemonic";
import { UnlockBrowserAccount } from "../../ConnectWallet/unlockBrowserAccount";
import { TradingAccountList } from "../../ConnectWallet/tradingAccountList";
import { ImportTradingAccountMnemonic } from "../../ConnectWallet/importTradingAccountMnemonic";
import { ConnectExtensionAccount } from "../../ConnectWallet/connnectExtensionAccount";
import { FundAccount } from "../../ConnectWallet/fundAccount";
import { MaximumTradingAccount } from "../../ConnectWallet/maximumTradingAccount";
import { InsufficientBalance } from "../../ConnectWallet/insufficientBalance";
import { Authorization } from "../../ConnectWallet/authorization";

export const Content = () => {
  const {
    selectedWallet,
    onSelectTradingAccount,
    selectedAccount,
    onLogout,
    localTradingAccounts,
    onSetTempTrading,
    onRegisterTradeAccount,
    selectedExtension,
    registerError,
    walletBalance,
    registerStatus,
    tempTrading,
    onRemoveTradingAccountFromChain,
    onRemoveTradingAccountFromDevice,
    removingStatus,
    removingError,
    onImportFromFile,
    importFromFileStatus,
    tempMnemonic,
    onExportTradeAccount,
    onSelectExtension,
    mainProxiesAccounts,
    onResetTempTrading,
    onResetTempMnemonic,
    importFromMnemonicError,
    importFromMnemonicStatus,
    onImportFromMnemonic,
  } = useConnectWalletProvider();
  const sourceId = selectedExtension?.id;
  const { onToogleConnectExtension } = useSettingsProvider();
  const { extensionsStatus } = useExtensions();
  const { connectExtensionAccounts, extensionAccounts } =
    useExtensionAccounts();
  const {
    selectedAddresses: { mainAddress },
    allAccounts,
  } = useProfile();

  // Move to useConnectWalletProvider
  const fundWalletPresent = useMemo(
    () => !!Object.keys(selectedWallet ?? {})?.length,
    [selectedWallet]
  );

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

  const filteredAccounts = useMemo(
    () =>
      localTradingAccounts?.filter(
        (item) => mainProxiesAccounts?.includes(item.address)
      ),
    [localTradingAccounts, mainProxiesAccounts]
  );

  const redirectMaximumAccounts =
    (mainProxiesAccounts?.length ?? 0) >= 3
      ? "MaximumTradingAccount"
      : "NewTradingAccount";

  const redirectEnoughBalance =
    (walletBalance ?? 0) >= 2 ? redirectMaximumAccounts : "InsufficientBalance";

  const availableOnDevice = useMemo(
    () =>
      localTradingAccounts?.some(
        (value) => value.address === tempTrading?.address
      ),
    [localTradingAccounts, tempTrading?.address]
  );

  // Choose extensionAccount according to tempTrading address
  const tempExtensionAccount = useMemo(() => {
    const mainAddress = allAccounts?.find(
      (acc) => acc.tradeAddress === tempTrading?.address
    )?.mainAddress;

    const extensionAccount = extensionAccounts?.find(
      (acc) => acc.address === mainAddress
    );

    return extensionAccount;
  }, [allAccounts, extensionAccounts, tempTrading?.address]);

  // Choose extension according to tempFundingWallet
  const tempSelectedExtension = useMemo(() => {
    const currentExtension = ExtensionsArray?.find(
      (value) => value.id === tempExtensionAccount?.source
    );
    return currentExtension;
  }, [tempExtensionAccount?.source]);
  return (
    <Multistep.Interactive className="h-auto max-h-screen">
      {(props) => (
        <>
          <Multistep.Trigger>
            <Profile
              onCreateTradingAccount={() =>
                props?.onPage(redirectEnoughBalance, true)
              }
              onImportTradingAccount={() =>
                props?.onPage("ConnectTradingAccount", true)
              }
              onSelectTradingAccount={(tradeAddress) =>
                onSelectTradingAccount({ tradeAddress })
              }
              onSwitch={() => {
                onToogleConnectExtension();
                onLogout?.();
              }}
              onLogout={() => onLogout?.()}
              onActions={() => props?.onPage("UserActions", true)}
              onRemoveCallback={() =>
                props?.onPage("RemoveTradingAccount", true)
              }
              onTempBrowserAccount={(e) => onSetTempTrading?.(e)}
              onExportBrowserAccount={(account) =>
                onExportTradeAccount({ account })
              }
              onExportBrowserAccountCallback={() =>
                props?.onPage("UnlockBrowserAccount", true)
              }
              tradingWalletPresent={!!selectedAccount?.address}
              fundWalletPresent={fundWalletPresent}
              fundWallet={selectedFundingWallet}
              tradeAccount={selectedAccount}
              localTradingAccounts={localTradingAccounts}
              mainProxiesAccounts={mainProxiesAccounts}
              onConnectWallet={() => props?.onPage("ConnectWallet", true)}
            />
          </Multistep.Trigger>
          <Multistep.Content>
            <NewTradingAccount
              key="NewTradingAccount"
              onCreateAccount={async (e) =>
                await onRegisterTradeAccount?.({
                  ...e,
                  main: selectedWallet?.address as string,
                })
              }
              loading={registerStatus === "loading"}
              fundWalletPresent={!!Object.keys(selectedWallet ?? {})?.length}
              errorTitle="Error"
              errorMessage={(registerError as Error)?.message ?? registerError}
              selectedExtension={selectedExtension}
              balance={walletBalance}
              onCreateCallback={() =>
                props?.onPage("TradingAccountSuccessfull", true)
              }
              onClose={() => props?.onChangeInteraction(false)}
            />
            <UnlockBrowserAccount
              key="UnlockBrowserAccount"
              tempBrowserAccount={tempTrading}
              onClose={() => props?.onChangeInteraction(false)}
              onAction={(account, password) =>
                onExportTradeAccount({ account, password })
              }
              onResetTempBrowserAccount={onResetTempTrading}
            />
            <ConnectTradingAccount
              key="ConnectTradingAccount"
              accounts={filteredAccounts as TradeAccount[]}
              onSelect={(e) => {
                onSelectTradingAccount?.({ tradeAddress: e.address });
              }}
              onClose={() => props?.onChangeInteraction(false)}
              onImport={() => props?.onPage("ImportTradingAccount")}
              onTempBrowserAccount={(e) => onSetTempTrading?.(e)}
              onSelectCallback={() => props?.onChangeInteraction(false)}
              onRemoveCallback={() => props?.onPage("RemoveTradingAccount")}
              onExportBrowserAccount={(account) =>
                onExportTradeAccount({ account })
              }
              onExportBrowserAccountCallback={() =>
                props?.onPage("UnlockBrowserAccount")
              }
              onImportMnemonic={() =>
                props?.onPage("ImportTradingAccountMnemonic")
              }
            />
            <UserActions
              key="UserActions"
              onClose={() => props?.onChangeInteraction(false)}
              onNewTradingAccount={() =>
                props?.onPage(redirectEnoughBalance, true)
              }
              onImportTradingAccount={() =>
                props?.onPage("ConnectTradingAccount")
              }
              fundWalletIsPresent={isPresent}
              onTradingAccountList={() => props?.onPage("TradingAccountList")}
              registeredProxies={mainProxiesAccounts}
            />
            <TradingAccountList
              key="TradingAccountList"
              tradingAccounts={mainProxiesAccounts}
              browserAccounts={localTradingAccounts}
              onRemove={(e) => onSetTempTrading?.(e)}
              onClose={() => props?.onChangeInteraction(false)}
              onRemoveCallback={() => props?.onPage("RemoveTradingAccount")}
            />
            <RemoveTradingAccount
              key="RemoveTradingAccount"
              tradingAccount={tempTrading as TradeAccount}
              fundWallet={tempExtensionAccount}
              availableOnDevice={availableOnDevice}
              onRemoveFromDevice={() =>
                onRemoveTradingAccountFromDevice?.(
                  tempTrading?.address as string
                )
              }
              onRemoveFromChain={async () =>
                await onRemoveTradingAccountFromChain?.({
                  proxy: tempTrading?.address as string,
                  main: tempExtensionAccount?.address as string,
                })
              }
              loading={removingStatus === "loading"}
              errorTitle="Error"
              errorMessage={(removingError as Error)?.message ?? removingError}
              selectedExtension={tempSelectedExtension}
              onCancel={() => props?.onChangeInteraction(false)}
            />
            <ImportTradingAccount
              key="ImportTradingAccount"
              onImport={async (e) => await onImportFromFile?.(e)}
              onRedirect={() => props?.onPage("ConnectTradingAccount")}
              onClose={() => props?.onPage("ConnectTradingAccount")}
              loading={importFromFileStatus === "loading"}
              whitelistBrowserAccounts={mainProxiesAccounts}
            />
            <ImportTradingAccountMnemonic
              key="ImportTradingAccountMnemonic"
              onImport={async (e) => {
                await onImportFromMnemonic?.(e);
                props?.onChangeInteraction(false);
              }}
              onCancel={() => props?.onPage("ConnectTradingAccount")}
              loading={importFromMnemonicStatus === "loading"}
              errorMessage={
                (importFromMnemonicError as Error)?.message ??
                importFromMnemonicError
              }
            />
            <TradingAccountSuccessfull
              key="TradingAccountSuccessfull"
              tradingAccount={selectedAccount}
              onClose={() => {
                onResetTempMnemonic?.();
                props?.onChangeInteraction(false);
              }}
              onTempBrowserAccount={(e) => onSetTempTrading?.(e)}
              onOpenMnemonic={() =>
                props?.onPage("TradingAccountMnemonic", true)
              }
              onDownloadPdf={() => window.alert("Downloading...")}
              onDownloadJson={(e) => onExportTradeAccount?.({ account: e })}
              onDownloadJsonCallback={() =>
                props?.onPage("UnlockBrowserAccount", true)
              }
            />
            <TradingAccountMnemonic
              key="TradingAccountMnemonic"
              onClose={() => props?.onPage("TradingAccountSuccessfull", true)}
              mnemonic={tempMnemonic?.split(" ") ?? []}
            />
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
            <MaximumTradingAccount
              key="MaximumTradingAccount"
              tradingAccounts={mainProxiesAccounts}
              browserAccounts={localTradingAccounts}
              onRemove={(e) => onSetTempTrading?.(e)}
              onClose={() => props?.onChangeInteraction(false)}
              onRemoveCallback={() => props?.onPage("RemoveTradingAccount")}
            />
            <InsufficientBalance
              key="InsufficientBalance"
              balance={walletBalance}
              onClose={() => props?.onChangeInteraction(false)}
            />
          </Multistep.Content>
        </>
      )}
    </Multistep.Interactive>
  );
};
