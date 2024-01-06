import { useMemo } from "react";
import { TradeAccount } from "@orderbook/core/providers/types";
import { Multistep } from "@polkadex/ux";

import { ExistingUser } from "../ConnectWallet/existingUser";
import { NewTradingAccount } from "../ConnectWallet/newTradingAccount";
import { ConnectTradingAccount } from "../ConnectWallet/connectTradingAccount";
import { RemoveTradingAccount } from "../ConnectWallet/removeTradingAccount";
import { TradingAccountList } from "../ConnectWallet/tradingAccountList";
import { ImportTradingAccount } from "../ConnectWallet/importTradingAccount";
import { MaximumTradingAccount } from "../ConnectWallet/maximumTradingAccount";
import { InsufficientBalance } from "../ConnectWallet/insufficientBalance";

import { useConnectWalletProvider } from "@/providers/connectWalletProvider/useConnectWallet";

export const ConnectExistingUser = ({
  onClose,
  onNext,
}: {
  onClose: () => void;
  onNext: (v: "Connect" | "TradingAccountSuccessfull") => void;
}) => {
  const {
    localTradingAccounts,
    onSelectTradingAccount,
    onResetWallet,
    onResetExtension,
    selectedWallet,
    onRegisterTradeAccount,
    registerStatus,
    registerError,
    removingError,
    onSetTempTrading,
    mainProxiesAccounts,
    removingStatus,
    tempTrading,
    onRemoveTradingAccountFromDevice,
    onRemoveTradingAccountFromChain,
    selectedExtension,
    onImportFromFile,
    importFromFileStatus,
    walletBalance,
  } = useConnectWalletProvider();

  const filteredAccounts = useMemo(
    () =>
      localTradingAccounts?.filter(
        (item) => mainProxiesAccounts?.includes(item.address)
      ),
    [localTradingAccounts, mainProxiesAccounts]
  );

  const hasAccounts = useMemo(
    () => !!filteredAccounts?.length,
    [filteredAccounts?.length]
  );

  const handleCloseInteraction = () => {
    onResetWallet?.();
    onResetExtension?.();
    onNext("Connect");
  };

  const redirectMaximumAccounts =
    (mainProxiesAccounts?.length ?? 0) >= 3
      ? "MaximumTradingAccount"
      : "NewTradingAccount";

  const redirectEnoughBalance =
    (walletBalance ?? 0) >= 1 ? redirectMaximumAccounts : "InsufficientBalance";

  return (
    <Multistep.Interactive resetOnUnmount defaultActive={hasAccounts}>
      {(props) => (
        <>
          <Multistep.Trigger>
            <ExistingUser
              onClose={onClose}
              onReadMore={() => {}}
              onBack={handleCloseInteraction}
              onCreate={() => props?.onPage(redirectEnoughBalance, true)}
              onRecover={() => props?.onPage("ConnectTradingAccount", true)}
              onTradingAccountList={() =>
                props?.onPage("TradingAccountList", true)
              }
              accounts={filteredAccounts as TradeAccount[]}
              onSelect={(e) =>
                onSelectTradingAccount?.({
                  tradeAddress: e.address,
                })
              }
              onSelectCallback={onClose}
            ></ExistingUser>
          </Multistep.Trigger>
          <Multistep.Content>
            <ConnectTradingAccount
              key="ConnectTradingAccount"
              accounts={filteredAccounts as TradeAccount[]}
              onSelect={(e) =>
                onSelectTradingAccount?.({ tradeAddress: e.address })
              }
              onRemove={(e) => onSetTempTrading?.(e)}
              onClose={
                hasAccounts
                  ? () => props?.onChangeInteraction(false)
                  : handleCloseInteraction
              }
              onImport={() => props?.onPage("ImportTradingAccount", true)}
              onSelectCallback={onClose}
              onRemoveCallback={() =>
                props?.onPage("RemoveTradingAccount", true)
              }
            />
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
              onCreateCallback={() => onNext("TradingAccountSuccessfull")}
              onClose={() => props?.onChangeInteraction(false)}
            />
            <TradingAccountList
              key="TradingAccountList"
              tradingAccounts={mainProxiesAccounts}
              onRemove={(e) => onSetTempTrading?.(e)}
              onClose={() => props?.onChangeInteraction(false)}
              onRemoveCallback={() => props?.onPage("RemoveTradingAccount")}
            />
            <RemoveTradingAccount
              key="RemoveTradingAccount"
              tradingAccount={tempTrading as TradeAccount}
              fundWallet={selectedWallet}
              onRemoveFromDevice={() =>
                onRemoveTradingAccountFromDevice?.(
                  tempTrading?.address as string
                )
              }
              onRemoveFromChain={async () =>
                await onRemoveTradingAccountFromChain?.({
                  main: selectedWallet?.address as string,
                  proxy: tempTrading?.address as string,
                })
              }
              loading={removingStatus === "loading"}
              errorTitle="Error"
              errorMessage={(removingError as Error)?.message ?? removingError}
              selectedExtension={selectedExtension}
              onCancel={() => props?.onChangeInteraction(false)} // onBack not working, rerendering Multistep, prev reseting..
            />
            <ImportTradingAccount
              key="ImportTradingAccount"
              onImport={async (e) => await onImportFromFile?.(e)}
              onRedirect={() => props?.onPage("ConnectTradingAccount")}
              onClose={() => props?.onPage("ConnectTradingAccount")}
              loading={importFromFileStatus === "loading"}
              whitelistAccounts={mainProxiesAccounts}
            />
            <MaximumTradingAccount
              key="MaximumTradingAccount"
              tradingAccounts={mainProxiesAccounts}
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
