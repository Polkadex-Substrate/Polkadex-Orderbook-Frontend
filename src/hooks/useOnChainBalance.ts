import { useEffect, useMemo, useState } from "react";

import { selectRangerApi, selectRangerIsReady } from "../modules/public/ranger";
import { selectUserInfo } from "../modules/user/profile";
import { fetchOnChainBalance } from "../helpers/fetchOnChainBalance";
import { selectUserBalance } from "../modules/user/balances";
import { selectCurrentMainAccount } from "../modules/user/mainAccount";

import { useReduxSelector } from "./useReduxSelector";

export const useOnChainBalance = (assetId: string) => {
  const api = useReduxSelector(selectRangerApi);
  const isApiConnectd = useReduxSelector(selectRangerIsReady);
  const balances = useReduxSelector(selectUserBalance);
  const user = useReduxSelector(selectCurrentMainAccount);
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  // only update if the user balance changes
  useEffect(() => {
    if (isApiConnectd && user.address) {
      fetchOnChainBalance(api, assetId, user.address)
        .then((balance) => {
          setBalance(balance);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [balances, api, assetId, user.address, isApiConnectd]);

  return { onChainBalance: balance, onChainBalanceLoading: loading };
};
