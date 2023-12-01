import { useExtensionAccounts, useExtensions } from "@polkadex/react-providers";
import {
  Icon,
  Separator,
  Typography,
  ConnectWallet,
  Wallets,
} from "@polkadex/ux";
import React, { useCallback, useMemo } from "react";
import { useWalletProvider } from "@orderbook/core/providers/user/walletProvider";

import { ConnectTradingAccount } from "../ConnectWallet/connectTradingAccount";
import { Multistep } from "../Multistep";
import { ImportTradingAccount } from "../ConnectWallet/importTradingAccount";
import { RemoveTradingAccount } from "../ConnectWallet/removeTradingAccount";
import { Authorization } from "../ConnectWallet/authorization";

export const Connect = ({
  onClose,
  onNext,
}: {
  onClose: () => void;
  onNext: (v: "ExistingUser" | "NewUser") => void;
}) => {
  const {
    selectedExtension,
    selectedAccount,
    proxiesLoading,
    onSelectWallet,
    onSelectExtension,
    proxiesSuccess,
    proxiesAccounts,
    localTradingAccounts,
    onSelectAccount,
    onSetLocalTradingAccounts,
    onRemoveTradingAccountFromDevice,
    onResetTempTrading,
    onSetTempTrading,
    tempTrading,
  } = useWalletProvider();

  const { extensionsStatus } = useExtensions();
  const { connectExtensionAccounts, extensionAccounts } =
    useExtensionAccounts();

  const walletsFiltered = useMemo(
    () =>
      extensionAccounts?.filter(
        ({ source }) => source === selectedExtension?.id
      ),
    [selectedExtension, extensionAccounts]
  );

  const onRedirect = useCallback(() => {
    const hasUser = !!proxiesAccounts?.length;
    const nextStep = hasUser ? "ExistingUser" : "NewUser";
    onNext(nextStep);
  }, [proxiesAccounts, onNext]);

  const availableTradingAccount = useMemo(
    () => localTradingAccounts?.length ?? 0,
    [localTradingAccounts]
  );
  return (
    <Multistep.Interactive resetOnUnmount>
      {(props) => (
        <>
          <Multistep.Trigger>
            <ConnectWallet
              onBack={onClose}
              onConnectProvider={(e) => {
                onSelectExtension?.(e);
                props?.onChangeInteraction(true);
              }}
              installedExtensions={extensionsStatus}
            >
              <div className="px-3">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 px-4">
                    <Separator.Horizontal />
                    <Typography.Text variant="secondary" size="xs">
                      Or access with
                    </Typography.Text>
                  </div>
                  <div
                    role="button"
                    onClick={() => {
                      props?.onPage("ConnectTradingAccount", true);
                    }}
                    className="flex items-center gap-2 p-4 hover:bg-level-3 duration-300 transition-colors rounded-md"
                  >
                    <Icon
                      name="Wallet"
                      className="w-7 h-7 p-1.5 bg-level-2 rounded-full"
                    />
                    <Typography.Text>
                      Trading account{" "}
                      <Typography.Text variant="secondary">
                        ({availableTradingAccount} available)
                      </Typography.Text>
                    </Typography.Text>
                  </div>
                </div>
              </div>
            </ConnectWallet>
          </Multistep.Trigger>
          <Multistep.Content>
            <Authorization
              key="ConnectAuthorization"
              onRedirect={() => props?.onPage("ConnectFundingWallets")}
              onAction={async () =>
                await connectExtensionAccounts(selectedExtension?.id as string)
              }
              onClose={props?.onReset}
              extensionIcon={selectedExtension?.id as string}
              extensionName={selectedExtension?.title}
            />
            <Wallets
              key="ConnectFundingWallets"
              wallets={walletsFiltered}
              onSelectWallet={(e) => onSelectWallet?.(e)}
              onClose={props?.onReset}
              onTryAgain={() =>
                selectedExtension && onSelectExtension?.(selectedExtension)
              }
              onRefresh={async () =>
                await connectExtensionAccounts(
                  selectedExtension?.title as string
                )
              }
              onRedirect={onRedirect}
              loading={!!proxiesLoading}
              success={!!proxiesSuccess}
            />
            <ConnectTradingAccount
              key="ConnectTradingAccount"
              accounts={localTradingAccounts}
              onSelect={(e) => {
                onSelectAccount?.(e);
                onClose();
              }}
              onClose={() => props?.onReset()}
              onImport={() => props?.onPage("ImportTradingAccount")}
              onRemove={(e) => {
                onSetTempTrading?.(e);
                props?.onPage("RemoveTradingAccount");
              }}
            />
            <ImportTradingAccount
              key="ImportTradingAccount"
              onBack={() => props?.onBack()}
              onClose={() => props?.onReset()}
              onAction={(e) => onSetLocalTradingAccounts?.(e)}
              onRedirect={() => props?.onPage("ConnectTradingAccount")}
            />
            <RemoveTradingAccount
              key="RemoveTradingAccount"
              tradingAccount={tempTrading}
              onRemoveFromDevice={(e) => onRemoveTradingAccountFromDevice?.(e)}
              onCancel={() => props?.onPage("ConnectTradingAccount")}
            />
          </Multistep.Content>
        </>
      )}
    </Multistep.Interactive>
  );
};
