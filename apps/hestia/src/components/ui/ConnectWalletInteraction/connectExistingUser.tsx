"use client";

import { useMemo, useState } from "react";
import { TradeAccount } from "@orderbook/core/providers/types";
import { Multistep } from "@polkadex/ux";
import { useConnectWalletProvider } from "@orderbook/core/providers/user/connectWalletProvider";
import { useCall, Ocex } from "@orderbook/core/index";

import { ExistingUser } from "../ConnectWallet/existingUser";
import { NewTradingAccount } from "../ConnectWallet/newTradingAccount";
import { ConnectTradingAccount } from "../ConnectWallet/connectTradingAccount";
import { RemoveTradingAccount } from "../ConnectWallet/removeTradingAccount";
import { TradingAccountList } from "../ConnectWallet/tradingAccountList";
import { ImportTradingAccount } from "../ConnectWallet/importTradingAccount";
import { MaximumTradingAccount } from "../ConnectWallet/maximumTradingAccount";
import { InsufficientBalance } from "../ConnectWallet/insufficientBalance";
import { ImportTradingAccountMnemonic } from "../ConnectWallet/importTradingAccountMnemonic";
import { UnlockAccount } from "../ReadyToUse/unlockAccount";
import { ConfirmTransaction } from "../ConnectWallet/confirmTransaction";

type RxtrinsicProps = Pick<Ocex, "removeProxyAccount">;

export const ConnectExistingUser = ({
  onClose,
  onNext,
}: {
  onClose: () => void;
  onNext: (v: "Connect" | "TradingAccountSuccessfull") => void;
}) => {
  const [extrinsic, setExtrinsic] =
    useState<keyof RxtrinsicProps>("removeProxyAccount");

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
    onExportTradeAccount,
    onResetTempTrading,
    importFromMnemonicError,
    importFromMnemonicStatus,
    onImportFromMnemonic,
  } = useConnectWalletProvider();

  const filteredAccounts = useMemo(
    () =>
      localTradingAccounts?.filter((item) =>
        mainProxiesAccounts?.includes(item.address)
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
    (walletBalance ?? 0) >= 2 ? redirectMaximumAccounts : "InsufficientBalance";

  const availableOnDevice = useMemo(
    () =>
      filteredAccounts?.some((value) => value.address === tempTrading?.address),
    [tempTrading?.address, filteredAccounts]
  );

  const { onRemoveProxyAccountOcex } = useCall();

  const extrinsicFn = useMemo(
    () => ({
      removeProxyAccount: () =>
        onRemoveProxyAccountOcex([tempTrading?.address ?? ""]),
      // registerMainAccoun: ()=>
      // addProxyAccount
    }),
    [tempTrading?.address, onRemoveProxyAccountOcex]
  );

  const actionFn = useMemo(
    () => ({
      removeProxyAccount: async () =>
        await onRemoveTradingAccountFromChain?.({
          main: selectedWallet?.address as string,
          proxy: tempTrading?.address as string,
        }),
    }),
    [selectedWallet?.address, tempTrading, onRemoveTradingAccountFromChain]
  );

  return (
    <Multistep.Interactive resetOnUnmount>
      {(props) => (
        <>
          <Multistep.Trigger>
            <ExistingUser
              onClose={onClose}
              onReadMore={() =>
                window.open(
                  "https://docs.polkadex.trade/orderbookPolkadexFAQHowToTradeStep3",
                  "_blank",
                  "noopener, noreferrer"
                )
              }
              onBack={handleCloseInteraction}
              onCreate={() => props?.onPage(redirectEnoughBalance, true)}
              onRecover={() => props?.onPage("ConnectTradingAccount", true)}
              onTradingAccountList={() =>
                props?.onPage("TradingAccountList", true)
              }
              accounts={filteredAccounts as TradeAccount[]}
              registeredProxies={mainProxiesAccounts}
              onSelect={(e) =>
                onSelectTradingAccount?.({
                  tradeAddress: e.address,
                })
              }
              onSelectCallback={onClose}
              onTempBrowserAccount={(e) => onSetTempTrading?.(e)}
              onRemoveCallback={() =>
                props?.onPage("RemoveTradingAccount", true)
              }
              onExportBrowserAccount={(account) =>
                onExportTradeAccount({ account })
              }
              onExportBrowserAccountCallback={() =>
                props?.onPage("UnlockBrowserAccount", true)
              }
            />
          </Multistep.Trigger>
          <Multistep.Content>
            <ConnectTradingAccount
              key="ConnectTradingAccount"
              accounts={filteredAccounts as TradeAccount[]}
              onSelect={(e) =>
                onSelectTradingAccount?.({ tradeAddress: e.address })
              }
              onTempBrowserAccount={(e) => onSetTempTrading?.(e)}
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
              onExportBrowserAccount={(account) =>
                onExportTradeAccount({ account })
              }
              onExportBrowserAccountCallback={() =>
                props?.onPage("UnlockBrowserAccount")
              }
              onImportMnemonic={() => {
                props?.onPage("ImportTradingAccountMnemonic", true);
              }}
            />
            <UnlockAccount
              key="UnlockBrowserAccount"
              tempBrowserAccount={tempTrading}
              onClose={() => props?.onPage("ConnectTradingAccount")}
              onAction={(account, password) =>
                onExportTradeAccount({ account, password })
              }
              onResetTempBrowserAccount={onResetTempTrading}
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
              browserAccounts={localTradingAccounts}
              onRemove={(e) => onSetTempTrading?.(e)}
              onClose={() => props?.onChangeInteraction(false)}
              onRemoveCallback={() => props?.onPage("RemoveTradingAccount")}
            />
            <RemoveTradingAccount
              key="RemoveTradingAccount"
              tradingAccount={tempTrading as TradeAccount}
              fundWallet={selectedWallet}
              availableOnDevice={availableOnDevice}
              onRemoveFromDevice={() =>
                onRemoveTradingAccountFromDevice?.(
                  tempTrading?.address as string
                )
              }
              onRemoveFromChain={() => {
                setExtrinsic("removeProxyAccount");
                props?.onPage("ConfirmTransaction");
              }}
              loading={removingStatus === "loading"}
              errorTitle="Error"
              errorMessage={(removingError as Error)?.message ?? removingError}
              selectedExtension={selectedExtension}
              onCancel={() => {
                props?.onChangeInteraction(false);
                onResetTempTrading();
              }}
            />
            <ImportTradingAccount
              key="ImportTradingAccount"
              onImport={async (e) => {
                await onImportFromFile?.(e);
                onClose();
              }}
              onRedirect={() => props?.onPage("ConnectTradingAccount")}
              onClose={() => props?.onPage("ConnectTradingAccount")}
              loading={importFromFileStatus === "loading"}
              whitelistBrowserAccounts={mainProxiesAccounts}
            />
            <ImportTradingAccountMnemonic
              key="ImportTradingAccountMnemonic"
              onImport={async (e) => {
                await onImportFromMnemonic?.(e);
                onClose();
              }}
              onCancel={() => props?.onPage("ConnectTradingAccount")}
              loading={importFromMnemonicStatus === "loading"}
              errorMessage={
                (importFromMnemonicError as Error)?.message ??
                importFromMnemonicError
              }
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
            <ConfirmTransaction
              key="ConfirmTransaction"
              extrinsicFn={extrinsicFn[extrinsic]}
              sender={selectedWallet?.address ?? ""}
              onClose={() => {
                onResetTempTrading();
                props?.onChangeInteraction(false);
              }}
              action={actionFn[extrinsic]}
            />
          </Multistep.Content>
        </>
      )}
    </Multistep.Interactive>
  );
};
