import { MutateHookProps } from "@orderbook/core/hooks/types";
import { useNativeApi } from "@orderbook/core/providers/public/nativeApi";
import { useUserAccounts } from "@polkadex/react-providers";
import { useProfile } from "@orderbook/core/providers/user/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  removeFromStorage,
  removeProxyFromAccount,
} from "@orderbook/core/helpers";
import { ACTIVE_ACCOUNT_KEY } from "@orderbook/core/providers/user/profile/constants";

import { appsyncOrderbookService } from "../utils/orderbookService";
import { QUERY_KEYS } from "../constants";

export type RemoveProxyAccountArgs = {
  proxy: string;
  main: string;
};

export function useRemoveProxyAccount(props: MutateHookProps) {
  const queryClient = useQueryClient();
  const { api } = useNativeApi();
  const { wallet } = useUserAccounts();
  const { getSigner, selectedAddresses, onUserLogout } = useProfile();

  const { mutateAsync, status, error } = useMutation({
    mutationFn: async ({ proxy, main }: RemoveProxyAccountArgs) => {
      if (!api || !wallet)
        throw new Error("You are not connected to blockchain ");

      const signer = getSigner(main);
      if (!signer) throw new Error("signer is not defined");

      appsyncOrderbookService.subscriber.subscribeAccountUpdate(main, () => {
        queryClient.setQueryData(
          QUERY_KEYS.singleProxyAccounts(main),
          (proxies: string[]) => {
            return proxies?.filter((value) => value !== proxy);
          }
        );
      });

      await removeProxyFromAccount(api, proxy, signer, main);

      // TODO: Temp solution, backend issue. Remove it when it resolved in backend
      await isTradingAccountRemovedFromDb(proxy, main);

      if (proxy === selectedAddresses.tradeAddress) {
        onUserLogout();
        removeFromStorage(ACTIVE_ACCOUNT_KEY);
      }
      wallet.remove(proxy);
    },
    onError: (error) => {
      props?.onError?.(error as Error);
      console.log(error);
    },
    onSuccess: () =>
      props?.onSuccess?.("Trading account removed from blockchain"),
  });

  return {
    mutateAsync,
    status,
    error,
  };
}

const isTradingAccountRemovedFromDb = async (
  tradeAddress: string,
  mainAddress: string
) => {
  const maxAttempts = 15;

  // TODO: Temp solution, backend issue
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const proxies =
        await appsyncOrderbookService.query.getTradingAddresses(mainAddress);
      if (!proxies.includes(tradeAddress)) {
        break;
      }
      throw new Error("Proxy not removed yet from database");
    } catch (error) {
      console.error(`Attempt ${attempt + 1} failed: ${error.message}`);
    }
    if (attempt < maxAttempts)
      await new Promise((resolve) => setTimeout(resolve, 10000));
  }
};
