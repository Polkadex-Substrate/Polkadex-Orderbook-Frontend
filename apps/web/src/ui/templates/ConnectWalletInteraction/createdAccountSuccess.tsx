import { Multistep } from "@polkadex/ux";

import { TradingAccountSuccessfull } from "../ConnectWallet/tradingAccountSuccessfull";
import { TradingAccountMnemonic } from "../ConnectWallet/tradingAccountMnemonic";
import { UnlockBrowserAccount } from "../ConnectWallet/unlockBrowserAccount";

import { useConnectWalletProvider } from "@/providers/connectWalletProvider/useConnectWallet";

export const CreatedAccountSuccess = ({ onClose }: { onClose: () => void }) => {
  const {
    tempMnemonic,
    onResetTempMnemonic,
    onExportTradeAccount,
    selectedAccount,
    onSetTempTrading,
    tempTrading,
    onResetTempTrading,
  } = useConnectWalletProvider();

  return (
    <Multistep.Interactive>
      {(props) => (
        <>
          <Multistep.Trigger>
            <TradingAccountSuccessfull
              tradingAccount={selectedAccount}
              onClose={() => {
                onResetTempMnemonic?.();
                onClose();
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
          </Multistep.Trigger>
          <Multistep.Content>
            <TradingAccountMnemonic
              key="TradingAccountMnemonic"
              onClose={() => props?.onChangeInteraction(false)}
              mnemonic={tempMnemonic?.split(" ") ?? []}
            />
            <UnlockBrowserAccount
              key="UnlockBrowserAccount"
              tempBrowserAccount={tempTrading}
              onClose={() => props?.onChangeInteraction(false)}
              onAction={(account) => onExportTradeAccount({ account })}
              onResetTempBrowserAccount={onResetTempTrading}
            />
          </Multistep.Content>
        </>
      )}
    </Multistep.Interactive>
  );
};
