import { Modal, Multistep } from "@polkadex/ux";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import { TradeAccount } from "@orderbook/core/providers/types";

import { ConnectTradingAccount } from "../ConnectWallet/connectTradingAccount";
import { ImportTradingAccount } from "../ConnectWallet/importTradingAccount";
import { RemoveTradingAccount } from "../ConnectWallet/removeTradingAccount";

import { useConnectWalletProvider } from "@/providers/connectWalletProvider/useConnectWallet";

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
                  onRemove={(e) => onSetTempTrading?.(e)}
                  onClose={onClose}
                  onImport={() => props?.onPage("ImportTradingAccount", true)}
                  onSelectCallback={onClose}
                  onRemoveCallback={() =>
                    props?.onPage("RemoveTradingAccount", true)
                  }
                />
              </Multistep.Trigger>
              <Multistep.Content>
                <ImportTradingAccount
                  key="ImportTradingAccount"
                  onImport={async (e) => await onImportFromFile?.(e)}
                  onRedirect={() => props?.onPage("ConnectTradingAccount")}
                  onClose={() => props?.onChangeInteraction(false)}
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
