import { ExtensionStatus } from "@polkadex/react-providers";
import { ConnectWallet } from "@polkadex/ux";
import { ExtensionsArray } from "@polkadot-cloud/assets/extensions";

import { ConnectTradingAccountCard } from "../ReadyToUse/connectTradingAccountCard";

export const ConnectWalletOrderbook = ({
  onClose,
  onConnectProvider,
  openInteraction,
  installedExtensions,
  availableTradingAccount,
}: {
  onConnectProvider: (e: (typeof ExtensionsArray)[0]) => void;
  onClose: () => void;
  openInteraction: (a: string, b?: boolean) => void;
  installedExtensions: Record<string, ExtensionStatus>;
  availableTradingAccount: number;
}) => {
  return (
    <ConnectWallet
      onBack={onClose}
      onConnectProvider={(e) => {
        onConnectProvider(e);
        openInteraction("Authorization", true);
      }}
      installedExtensions={installedExtensions}
    >
      <ConnectTradingAccountCard
        onOpenInteraction={() => openInteraction("ConnectTradingAccount", true)}
        tradingAccountLentgh={availableTradingAccount}
      />
    </ConnectWallet>
  );
};
