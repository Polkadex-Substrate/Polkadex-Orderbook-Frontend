// TODO: REPLACE TESTING PROVIDER
import { useWalletProvider } from "@orderbook/core/providers/user/walletProvider";
import { useEffect } from "react";
import { Multistep } from "@polkadex/ux";

import { TradingAccountSuccessfull } from "../ConnectWallet/tradingAccountSuccessfull";
import { TradingAccountMnemonic } from "../ConnectWallet/tradingAccountMnemonic";

export const CreatedAccountSuccess = ({ onClose }: { onClose: () => void }) => {
  const {
    tempMnemonic,
    onResetTempMnemonic,
    onExportTradeAccount,
    selectedAccount,
  } = useWalletProvider(); // Testing provider

  useEffect(() => {
    return () => onResetTempMnemonic?.();
  }, [onResetTempMnemonic]);

  return (
    <Multistep.Interactive>
      {(props) => (
        <>
          <Multistep.Trigger>
            <TradingAccountSuccessfull
              tradingAccount={selectedAccount}
              onClose={onClose}
              onOpenMnemonic={() =>
                props?.onPage("TradingAccountMnemonic", true)
              }
              onDownloadPdf={() => window.alert("Downloading...")}
              onDownloadJson={(e) =>
                onExportTradeAccount?.({ tradeAccount: e })
              }
            />
          </Multistep.Trigger>
          <Multistep.Content>
            <TradingAccountMnemonic
              key="TradingAccountMnemonic"
              onClose={() => props?.onChangeInteraction(false)}
              mnemonic={tempMnemonic?.split(" ") ?? []}
            />
          </Multistep.Content>
        </>
      )}
    </Multistep.Interactive>
  );
};
