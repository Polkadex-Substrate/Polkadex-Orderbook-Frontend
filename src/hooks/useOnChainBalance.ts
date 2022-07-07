import { useEffect, useState } from "react";

import { selectRangerApi, selectRangerIsReady } from "../modules/public/ranger";
import { selectUserInfo } from "../modules/user/profile";
import { fetchOnChainBalance } from "../helpers/fetchOnChainBalance";

import { useReduxSelector } from "./useReduxSelector";

export const useOnChainBalance = (assetId: string) => {
  const api = useReduxSelector(selectRangerApi);
  const isApiConnectd = useReduxSelector(selectRangerIsReady);
  const user = useReduxSelector(selectUserInfo);
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

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
  }, [api, assetId, isApiConnectd, user.main_addr]);
  return { onChainBalance: balance, onChainBalanceLoading: loading };
};
