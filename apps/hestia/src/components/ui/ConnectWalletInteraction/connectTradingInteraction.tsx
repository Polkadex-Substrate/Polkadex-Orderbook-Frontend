import { Modal, Multistep } from "@polkadex/ux";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import { TradeAccount } from "@orderbook/core/providers/types";
import { useConnectWalletProvider } from "@orderbook/core/providers/user/connectWalletProvider";

import { ConnectTradingAccount } from "../ConnectWallet/connectTradingAccount";
import { ImportTradingAccount } from "../ConnectWallet/importTradingAccount";
import { RemoveTradingAccount } from "../ConnectWallet/removeTradingAccount";
import { ImportTradingAccountMnemonic } from "../ConnectWallet/importTradingAccountMnemonic";
import { UnlockAccount } from "../ReadyToUse/unlockAccount";

export const ConnectTradingInteraction = () => {
  const { connectTrading, onToogleConnectTrading } = useSettingsProvider();
  const onClose = () => onToogleConnectTrading(false);
  const {
    selectedExtension,
    localTradingAccounts,
    onSelectTradingAccount,
    onImportFromFile,
    importFromFileStatus,
    onRemoveTradingAccountFromDevice,
    onSetTempTrading,
    tempTrading,
    mainProxiesAccounts,
    onExportTradeAccount,
    onResetTempTrading,
    importFromMnemonicError,
    importFromMnemonicStatus,
    onImportFromMnemonic,
  } = useConnectWalletProvider();

  return (
    <Modal open={!!connectTrading} onOpenChange={onToogleConnectTrading}>
      <Modal.Content>
        <Multistep.Interactive resetOnUnmount>
          {(props) => (
            <>
              <Multistep.Trigger>
                <ConnectTradingAccount
                  key="ConnectTradingAccount"
                  accounts={localTradingAccounts}
                  onSelect={(e) =>
                    onSelectTradingAccount?.({ tradeAddress: e.address })
                  }
                  onTempBrowserAccount={(e) => onSetTempTrading?.(e)}
                  onClose={onClose}
                  onImport={() => props?.onPage("ImportTradingAccount", true)}
                  onSelectCallback={onClose}
                  onRemoveCallback={() =>
                    props?.onPage("RemoveTradingAccount", true)
                  }
                  onExportBrowserAccount={(account) =>
                    onExportTradeAccount({ account })
                  }
                  onExportBrowserAccountCallback={() =>
                    props?.onPage("UnlockBrowserAccount", true)
                  }
                  onImportMnemonic={() => {
                    props?.onPage("ImportTradingAccountMnemonic", true);
                  }}
                  enabledExtensionAccount
                />
              </Multistep.Trigger>
              <Multistep.Content>
                <UnlockAccount
                  key="UnlockBrowserAccount"
                  tempBrowserAccount={tempTrading}
                  onClose={() => props?.onChangeInteraction(false)}
                  onAction={(account, password) =>
                    onExportTradeAccount({ account, password })
                  }
                  onResetTempBrowserAccount={onResetTempTrading}
                />
                <ImportTradingAccount
                  key="ImportTradingAccount"
                  onImport={async (e) => await onImportFromFile?.(e)}
                  onRedirect={() => props?.onPage("ConnectTradingAccount")}
                  onClose={() => props?.onChangeInteraction(false)}
                  loading={importFromFileStatus === "loading"}
                  whitelistBrowserAccounts={mainProxiesAccounts}
                />
                <ImportTradingAccountMnemonic
                  key="ImportTradingAccountMnemonic"
                  onImport={async (e) => {
                    await onImportFromMnemonic?.(e);
                    props?.onChangeInteraction(false);
                  }}
                  onCancel={() => props?.onChangeInteraction(false)}
                  loading={importFromMnemonicStatus === "loading"}
                  errorMessage={
                    (importFromMnemonicError as Error)?.message ??
                    importFromMnemonicError
                  }
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
                  onCancel={() => props?.onChangeInteraction(false)}
                />
              </Multistep.Content>
            </>
          )}
        </Multistep.Interactive>
      </Modal.Content>
    </Modal>
  );
};
