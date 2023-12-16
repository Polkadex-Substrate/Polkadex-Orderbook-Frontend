import { MutateHookProps } from "@orderbook/core/hooks/types";
import { useNativeApi } from "@orderbook/core/providers/public/nativeApi";
import { useUserAccounts } from "@polkadex/react-providers";
import { useProfile } from "@orderbook/core/providers/user/profile";
import { useMutation } from "@tanstack/react-query";
import {
  removeFromStorage,
  removeProxyFromAccount,
} from "@orderbook/core/helpers";
import { ACTIVE_ACCOUNT_KEY } from "@orderbook/core/providers/user/profile/constants";

export type RemoveProxyAccountArgs = {
  proxy: string;
  main: string;
};

export function useRemoveProxyAccount(props: MutateHookProps) {
  const { api } = useNativeApi();
  const { wallet } = useUserAccounts();
  const { getSigner, selectedAddresses, onUserLogout } = useProfile();

  const { mutateAsync, status, error } = useMutation({
    mutationFn: async ({ proxy, main }: RemoveProxyAccountArgs) => {
      if (!api || !wallet)
        throw new Error("You are not connected to blockchain ");

      const signer = getSigner(main);
      if (!signer) throw new Error("signer is not defined");

      await removeProxyFromAccount(api, proxy, signer, main);

      if (proxy === selectedAddresses.tradeAddress) {
        onUserLogout();
        removeFromStorage(ACTIVE_ACCOUNT_KEY);
      }

      wallet.remove(proxy);
      props?.onSuccess?.("Trading account removed from blockchain");
    },
    onError: (error) => {
      props?.onError?.(error as Error);
      console.log(error);
    },
  });

  return {
    mutateAsync,
    status,
    error,
  };
}
