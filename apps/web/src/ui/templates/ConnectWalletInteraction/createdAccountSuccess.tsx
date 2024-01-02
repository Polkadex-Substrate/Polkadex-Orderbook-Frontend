// TODO: REPLACE TESTING PROVIDER
import { useEffect, useRef } from "react";
import { Multistep } from "@polkadex/ux";

import { TradingAccountSuccessfull } from "../ConnectWallet/tradingAccountSuccessfull";
import { TradingAccountMnemonic } from "../ConnectWallet/tradingAccountMnemonic";

import { useConnectWalletProvider } from "@/providers/connectWalletProvider/useConnectWallet";

export const CreatedAccountSuccess = ({ onClose }: { onClose: () => void }) => {
  const isMounted = useRef(true);

  const {
    tempMnemonic,
    onResetTempMnemonic,
    onExportTradeAccount,
    selectedAccount,
  } = useConnectWalletProvider();

  useEffect(() => {
    return () => {
      if (isMounted.current) {
        onResetTempMnemonic?.();
      }
    };
  }, [onResetTempMnemonic]);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

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
              onDownloadJson={(e) => onExportTradeAccount?.({ account: e })}
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
