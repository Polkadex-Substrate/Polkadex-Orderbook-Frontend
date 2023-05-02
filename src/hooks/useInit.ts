import keyring from "@polkadot/ui-keyring";
import { useEffect } from "react";
import { cryptoWaitReady } from "@polkadot/util-crypto";

import { useTradeWallet } from "../providers/user/tradeWallet";

import { useNativeApi } from "@polkadex/orderbook/providers/public/nativeApi";
import { useExtensionWallet } from "@polkadex/orderbook/providers/user/extensionWallet";

export const useInit = () => {
  const cryptoWait = async () => {
    try {
      await cryptoWaitReady();
      keyring.loadAll({ ss58Format: 88, type: "sr25519" });
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    cryptoWait();
  }, []);

  const { onConnectNativeApi, timestamp, connecting } = useNativeApi();
  const { onLoadTradeAccounts } = useTradeWallet();
  const { onPolkadotExtensionWallet } = useExtensionWallet();
  const shouldRangerConnect = !timestamp && !connecting;

  // basic initialization
  useEffect(() => {
    if (shouldRangerConnect) onConnectNativeApi();
    onLoadTradeAccounts();
    onPolkadotExtensionWallet();
  }, [shouldRangerConnect, onConnectNativeApi, onPolkadotExtensionWallet]);
};
