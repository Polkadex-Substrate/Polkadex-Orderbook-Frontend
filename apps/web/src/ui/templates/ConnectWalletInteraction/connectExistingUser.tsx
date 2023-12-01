import { useWalletProvider } from "@orderbook/core/providers/user/walletProvider";
import { useMemo } from "react";

import { Multistep } from "../Multistep";
import { ExistingUser } from "../ConnectWallet/existingUser";
import { NewTradingAccount } from "../ConnectWallet/newTradingAccount";
import { ConnectTradingAccount } from "../ConnectWallet/connectTradingAccount";
import { ProcessingTransaction } from "../ConnectWallet/processingTransaction";
import { ErrorTransaction } from "../ConnectWallet/errorTransaction";
import { RemoveTradingAccount } from "../ConnectWallet/removeTradingAccount";

export const ConnectExistingUser = ({
  onClose,
  onNext,
}: {
  onClose: () => void;
  onNext: (v: "Connect" | "TradingAccountSuccessfull") => void;
}) => {
  const {
    localTradingAccounts,
    onSelectAccount,
    onResetWallet,
    selectedWallet,
    onRegisterTradeAccount,
    registerStatus,
    registerError,
    onResetTempTrading,
    onSetTempTrading,
    proxiesAccounts,
    removingError,
    removingStatus,
    tempTrading,
    onRemoveTradingAccountFromDevice,
    onRemoveTradingAccountFromChain,
  } = useWalletProvider();

  const filteredAccounts = useMemo(
    () =>
      localTradingAccounts?.filter(
        (item) => proxiesAccounts?.includes(item.address)
      ),
    [localTradingAccounts, proxiesAccounts]
  );

  console.log("localTradingAccounts", localTradingAccounts);
  console.log("proxiesAccounts", proxiesAccounts);

  return (
    <Multistep.Interactive>
      {(props) => (
        <>
          <Multistep.Trigger>
            <ExistingUser
              onClose={onClose}
              onReadMore={() => {}}
              onBack={() => {
                onResetWallet?.();
                onNext("Connect");
              }}
              onCreate={() => props?.onPage("NewTradingAccount", true)}
              onRecover={() => props?.onPage("ConnectTradingAccount", true)}
            />
          </Multistep.Trigger>
          <Multistep.Content>
            <NewTradingAccount
              key="NewTradingAccount"
              onClose={() => props?.onChangeInteraction(false)}
              onAction={async (e) => await onRegisterTradeAccount?.(e)}
              onRedirect={() => props?.onPage("ProcessingTransaction")}
            />
            <ConnectTradingAccount
              key="ConnectTradingAccount"
              accounts={filteredAccounts}
              onSelect={(e) => {
                onSelectAccount?.(e);
                onClose();
              }}
              onClose={() => props?.onChangeInteraction(false)}
              onImport={() => props?.onPage("ImportTradingAccount")}
              onRemove={(e) => {
                onSetTempTrading?.(e);
                props?.onPage("RemoveTradingAccount");
              }}
            />
            <RemoveTradingAccount
              key="RemoveTradingAccount"
              tradingAccount={tempTrading}
              fundWallet={selectedWallet}
              onRemoveFromDevice={(e) => onRemoveTradingAccountFromDevice?.(e)}
              onRemoveFromChain={(e) =>
                onRemoveTradingAccountFromChain?.({
                  tradeAddress: e,
                  callbackFn: () => props?.onPage("ConnectTradingAccount"),
                })
              }
              onCancel={() => props?.onPage("ConnectTradingAccount")}
            />
            <ProcessingTransaction
              key="ProcessingTransaction"
              logo={selectedWallet?.source as string}
              onRedirect={() =>
                registerStatus === "success"
                  ? onNext("TradingAccountSuccessfull")
                  : props?.onPage("ErrorTransaction")
              }
              shouldRedirect={
                registerStatus === "success" || registerStatus === "error"
              }
            />
            <ProcessingTransaction
              key="ProcessingTransactionRemove"
              logo={selectedWallet?.source as string}
              onRedirect={() =>
                removingStatus === "success"
                  ? props?.onPage("ImportTradingAccount")
                  : props?.onPage("ErrorTransactionRemove")
              }
              shouldRedirect={
                removingStatus === "success" || removingStatus === "error"
              }
            />
            <ErrorTransaction
              key="ErrorTransactionRemove"
              onAction={() => {
                props?.onPage("ImportTradingAccount");
              }}
              message={removingError?.message ?? "Anything wrong..."}
              title={removingError?.name}
            />
            <ErrorTransaction
              key="ErrorTransaction"
              onAction={() => {
                onResetTempTrading?.();
                props?.onPage("NewTradingAccount");
              }}
              message={registerError?.message ?? "Anything wrong..."}
              title={registerError?.name}
            />
          </Multistep.Content>
        </>
      )}
    </Multistep.Interactive>
  );
};
