import { useEffect, useState } from "react";

import { fetchOnChainBalance } from "../helpers/fetchOnChainBalance";
import { selectUserBalance } from "../modules/user/balances";

import { useReduxSelector } from "./useReduxSelector";

import { useProfile } from "@polkadex/orderbook/providers/user/profile";
import { useNativeApi } from "@polkadex/orderbook/providers/public/nativeApi";

export const useOnChainBalance = (assetId: string) => {
  const profileState = useProfile();
  const nativeApiState = useNativeApi();

  const api = nativeApiState.api;
  const isApiConnected = nativeApiState.connected;
  const balances = useReduxSelector(selectUserBalance);
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
