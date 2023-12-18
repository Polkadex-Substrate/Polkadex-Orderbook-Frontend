import { ChevronDownIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Typography,
  truncateString,
  Icons,
  Popover,
  Multistep,
} from "@polkadex/ux";
import { useMemo } from "react";
import { TradeAccount } from "@orderbook/core/providers/types";

import { Profile as ProfileDropdown } from "../../templates/ConnectWallet/profile";

import { NewTradingAccount } from "@/ui/templates/ConnectWallet/newTradingAccount";
import { ConnectTradingAccount } from "@/ui/templates/ConnectWallet/connectTradingAccount";
import { UserActions } from "@/ui/templates/ConnectWallet/userActions";
import { RemoveTradingAccount } from "@/ui/templates/ConnectWallet/removeTradingAccount";
import { ImportTradingAccount } from "@/ui/templates/ConnectWallet/importTradingAccount";
import { TradingAccountSuccessfull } from "@/ui/templates/ConnectWallet/tradingAccountSuccessfull";
import { TradingAccountMnemonic } from "@/ui/templates/ConnectWallet/tradingAccountMnemonic";
import { useConnectWallet } from "@/hooks";

export const Profile = ({ onClick }: { onClick: () => void }) => {
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
    proxiesAccounts,
    tempMnemonic,
    onExportTradeAccount,
  } = useConnectWallet();

  const shortAddress = useMemo(
    () => truncateString(selectedAccount?.address ?? "", 3),
    [selectedAccount?.address]
  );

  const tradingWalletPresent = useMemo(
    () => !!Object.keys(selectedAccount ?? {})?.length,
    [selectedAccount]
  );
  const fundWalletPresent = useMemo(
    () => !!Object.keys(selectedWallet ?? {})?.length,
    [selectedWallet]
  );

  if (tradingWalletPresent || fundWalletPresent)
    return (
      <Popover>
        <Popover.Trigger className="bg-level-1 transition-colors duration-300 pl-2 flex items-center gap-2 rounded-md">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4">
              <Icons.Avatar />
            </div>
            {fundWalletPresent ? (
              <Typography.Text size="xs" bold>
                {selectedWallet?.name}
              </Typography.Text>
            ) : (
              <Typography.Text size="xs" bold variant="secondary">
                Wallet not present
              </Typography.Text>
            )}
          </div>
          <div className="flex items-center gap-2 bg-level-4 px-2 py-1 rounded-md">
            {tradingWalletPresent ? (
              <Typography.Text size="xs" bold>
                {selectedAccount?.meta.name} ({shortAddress})
              </Typography.Text>
            ) : (
              <Typography.Text size="xs" bold variant="secondary">
                No trading account
              </Typography.Text>
            )}

            <ChevronDownIcon className="h-3 w-3" />
          </div>
        </Popover.Trigger>
        <Popover.Content>
          <Multistep.Interactive
            className="h-auto overflow-auto max-h-screen"
            placement="top center"
          >
            {(props) => (
              <>
                <Multistep.Trigger>
                  <ProfileDropdown
                    onCreateTradingAccount={() =>
                      props?.onPage("NewTradingAccount", true)
                    }
                    onImportTradingAccount={() =>
                      props?.onPage("ConnectTradingAccount", true)
                    }
                    onSelectTradingAccount={(tradeAddress) =>
                      onSelectTradingAccount({ tradeAddress })
                    }
                    onSwitch={() => {}}
                    onLogout={() => onLogout?.()}
                    onActions={() => props?.onPage("UserActions", true)}
                    onRemove={(e) => {
                      onSetTempTrading?.(e);
                      props?.onPage("RemoveTradingAccount", true);
                    }}
                    tradingWalletPresent={!!selectedAccount?.address}
                    fundWalletPresent={!!selectedWallet?.name}
                    fundWallet={selectedWallet}
                    tradeAccount={selectedAccount}
                    localTradingAccounts={localTradingAccounts}
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
                    fundWalletPresent={
                      !!Object.keys(selectedWallet ?? {})?.length
                    }
                    errorTitle="Error"
                    errorMessage={
                      (registerError as Error)?.message ?? registerError
                    }
                    selectedExtension={selectedExtension}
                    balance={walletBalance}
                    onCreateCallback={() =>
                      props?.onPage("TradingAccountSuccessfull", true)
                    }
                    onClose={() => props?.onChangeInteraction(false)}
                  />

                  <ConnectTradingAccount
                    key="ConnectTradingAccount"
                    accounts={localTradingAccounts}
                    onSelect={(e) => {
                      onSelectTradingAccount?.({ tradeAddress: e.address });
                    }}
                    onClose={() => props?.onChangeInteraction(false)}
                    onImport={() => props?.onPage("ImportTradingAccount")}
                    onRemove={(e) => onSetTempTrading?.(e)}
                    onSelectCallback={() => props?.onChangeInteraction(false)}
                    onRemoveCallback={() =>
                      props?.onPage("RemoveTradingAccount")
                    }
                  />
                  <UserActions
                    key="UserActions"
                    onClose={() => props?.onChangeInteraction(false)}
                    onNewTradingAccount={() =>
                      props?.onPage("NewTradingAccount")
                    }
                    onImportTradingAccount={() =>
                      props?.onPage("ConnectTradingAccount")
                    }
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
                        proxy: tempTrading?.address as string,
                        main: selectedWallet?.address as string,
                      })
                    }
                    loading={removingStatus === "loading"}
                    errorTitle="Error"
                    errorMessage={
                      (removingError as Error)?.message ?? removingError
                    }
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
                  <TradingAccountSuccessfull
                    key="TradingAccountSuccessfull"
                    tradingAccount={selectedAccount}
                    onClose={() => props?.onChangeInteraction(false)}
                    onOpenMnemonic={() =>
                      props?.onPage("TradingAccountMnemonic", true)
                    }
                    onDownloadPdf={() => window.alert("Downloading...")}
                    onDownloadJson={(e) =>
                      onExportTradeAccount?.({ account: e })
                    }
                  />
                  <TradingAccountMnemonic
                    key="TradingAccountMnemonic"
                    onClose={() =>
                      props?.onPage("TradingAccountMnemonic", true)
                    }
                    mnemonic={tempMnemonic?.split(" ") ?? []}
                  />
                </Multistep.Content>
              </>
            )}
          </Multistep.Interactive>
        </Popover.Content>
      </Popover>
    );

  return <Button.Solid onClick={onClick}>Connect wallet</Button.Solid>;
};
