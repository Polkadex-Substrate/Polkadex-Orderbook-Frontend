import { useEffect } from "react";

import { useTradeWallet } from "../providers/user/tradeWallet";

import { useNativeApi } from "@polkadex/orderbook/providers/public/nativeApi";
import { useExtensionWallet } from "@polkadex/orderbook/providers/user/extensionWallet";

export const useInit = () => {
  const { onConnectNativeApi, timestamp, connecting } = useNativeApi();
  const { onLoadTradeAccounts } = useTradeWallet();
  const { onPolkadotExtensionWallet } = useExtensionWallet();
  const shouldRangerConnect = !timestamp && !connecting;

  // basic initialization
  useEffect(() => {
    if (shouldRangerConnect) onConnectNativeApi();
    onLoadTradeAccounts();
    onPolkadotExtensionWallet();
  }, [shouldRangerConnect]);
};
