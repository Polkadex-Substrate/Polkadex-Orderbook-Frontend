import { useEffect, useState } from "react";

import { fetchOnChainBalance } from "@/helpers";
import { useBalancesProvider } from "@/providers/user/balancesProvider";
import { useProfile } from "@/providers/user/profile";
import { useNativeApi } from "@/providers/public/nativeApi";

export const useOnChainBalance = (assetId: string) => {
  const profileState = useProfile();
  const nativeApiState = useNativeApi();

  const api = nativeApiState.api;
  const isApiConnected = nativeApiState.connected;
  const { balances } = useBalancesProvider();
  const currentAccount = profileState?.selectedAccount;
  const mainAddress = currentAccount.mainAddress;
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  // only update if the user balance changes
  useEffect(() => {
    if (isApiConnected && mainAddress) {
      fetchOnChainBalance(api, assetId, mainAddress)
        .then((balance) => {
          setBalance(balance);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [balances, api, assetId, mainAddress, isApiConnected]);

  return { onChainBalance: balance, onChainBalanceLoading: loading };
};