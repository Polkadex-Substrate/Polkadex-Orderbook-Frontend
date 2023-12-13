import { useMemo } from "react";
import { TradeAccount } from "@orderbook/core/providers/types";
import { Multistep } from "@polkadex/ux";
import { useWalletProvider } from "@orderbook/core/providers/user/walletProvider";

import { ExistingUser } from "../ConnectWallet/existingUser";
import { NewTradingAccount } from "../ConnectWallet/newTradingAccount";
import { ConnectTradingAccount } from "../ConnectWallet/connectTradingAccount";
import { RemoveTradingAccount } from "../ConnectWallet/removeTradingAccount";
import { TradingAccountList } from "../ConnectWallet/tradingAccountList";
import { ImportTradingAccount } from "../ConnectWallet/importTradingAccount";
import { MaximumTradingAccount } from "../ConnectWallet/maximumTradingAccount";
import { InsufficientBalance } from "../ConnectWallet/insufficientBalance";

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
    onResetExtension,
    selectedWallet,
    onRegisterTradeAccount,
    registerStatus,
    registerError,
    removingError,
    onSetTempTrading,
    proxiesAccounts,
    removingStatus,
    tempTrading,
    onRemoveTradingAccountFromDevice,
    onRemoveTradingAccountFromChain,
    selectedExtension,
    onImportFromFile,
    importFromFileStatus,
    walletBalance,
  } = useWalletProvider();

  const filteredAccounts = useMemo(
    () =>
      localTradingAccounts?.filter(
        (item) => proxiesAccounts?.includes(item.address)
      ),
    [localTradingAccounts, proxiesAccounts]
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
    (proxiesAccounts?.length ?? 0) >= 3
      ? "MaximumTradingAccount"
      : "NewTradingAccount";

  const redirectEnoughBalance =
    (walletBalance ?? 0) >= 1 ? redirectMaximumAccounts : "InsufficientBalance";

  return (
    <Multistep.Interactive
      resetOnUnmount
      // defaultActive={hasAccounts} // TODO: Fails, necessary if exist accounts in local
    >
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
            />
          </Multistep.Trigger>
          <Multistep.Content>
            <ConnectTradingAccount
              key="ConnectTradingAccount"
              accounts={filteredAccounts as TradeAccount[]}
              onSelect={(e) => onSelectAccount?.(e)}
              onRemove={(e) => onSetTempTrading?.(e)}
              onClose={
                hasAccounts
                  ? handleCloseInteraction
                  : () => props?.onChangeInteraction(false)
              }
              onImport={() => props?.onPage("ImportTradingAccount", true)}
              onSelectCallback={onClose}
              onRemoveCallback={() =>
                props?.onPage("RemoveTradingAccount", true)
              }
            />
            <NewTradingAccount
              key="NewTradingAccount"
              onCreateAccount={async (e) => await onRegisterTradeAccount?.(e)}
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
              tradingAccounts={proxiesAccounts}
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
                  tradeAddress: tempTrading?.address as string,
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
              whitelistAccounts={proxiesAccounts}
            />
            <MaximumTradingAccount
              key="MaximumTradingAccount"
              tradingAccounts={proxiesAccounts}
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
