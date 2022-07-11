import { useEffect, useState } from "react";

import { selectRangerApi, selectRangerIsReady } from "../modules/public/ranger";
import { selectUserInfo } from "../modules/user/profile";
import { fetchOnChainBalance } from "../helpers/fetchOnChainBalance";
import { selectUserBalance } from "../modules/user/balances";

import { useReduxSelector } from "./useReduxSelector";

export const useOnChainBalance = (assetId: string) => {
  const api = useReduxSelector(selectRangerApi);
  const balances = useReduxSelector(selectUserBalance);
  const isApiConnectd = useReduxSelector(selectRangerIsReady);
  const user = useReduxSelector(selectUserInfo);
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  // only update if the user balance changes
  useEffect(() => {
    if (isApiConnectd && user.main_addr) {
      fetchOnChainBalance(api, assetId, user.main_addr)
        .then((balance) => {
          setBalance(balance);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [balances]);

  return { onChainBalance: balance, onChainBalanceLoading: loading };
};
