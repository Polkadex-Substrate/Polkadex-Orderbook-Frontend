import { MutateHookProps } from "@orderbook/core/hooks/types";
import { useNativeApi } from "@orderbook/core/providers/public/nativeApi";
import { useUserAccounts } from "@polkadex/react-providers";
import { useProfile } from "@orderbook/core/providers/user/profile";
import { useMutation } from "@tanstack/react-query";
import { removeProxyFromAccount } from "@orderbook/core/helpers";

export type RemoveProxyAccountArgs = {
  proxy: string;
  main: string;
};

export function useRemoveProxyAccount(props: MutateHookProps) {
  const { api } = useNativeApi();
  const { wallet } = useUserAccounts();
  const { getSigner } = useProfile();

  const { mutateAsync, status, error } = useMutation({
    mutationFn: async ({ proxy, main }: RemoveProxyAccountArgs) => {
      if (!api || !wallet)
        throw new Error("You are not connected to blockchain ");

      const signer = getSigner(main);
      if (!signer) throw new Error("signer is not defined");

      await removeProxyFromAccount(api, proxy, signer, main);
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
