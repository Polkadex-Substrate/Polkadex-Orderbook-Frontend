import { useNativeApi } from "@orderbook/core/providers/public/nativeApi";
import { useMutation } from "@tanstack/react-query";
import { useUserAccounts } from "@polkadex/react-providers";
import {
  addProxyToAccount,
  getAddressFromMnemonic,
} from "@orderbook/core/helpers";
import { useProfile } from "@orderbook/core/providers/user/profile";
import { MutateHookProps } from "@orderbook/core/hooks/types";

export type AddProxyAccountArgs = {
  mnemonic: string;
  main: string;
  name: string;
  password?: string;
};
export function useAddProxyAccount(props: MutateHookProps) {
  const { api } = useNativeApi();
  const { wallet } = useUserAccounts();
  const { getSigner } = useProfile();

  const { mutateAsync, status, error } = useMutation({
    mutationFn: async ({
      mnemonic,
      main,
      name,
      password,
    }: AddProxyAccountArgs) => {
      if (!api || !wallet) throw new Error("api or wallet is not defined");

      const signer = getSigner(main);
      if (!signer) throw new Error("signer is not defined");

      const proxy = getAddressFromMnemonic(mnemonic);
      await addProxyToAccount(api, proxy, signer, main);
      wallet.add(mnemonic, name, password);
      props?.onSuccess?.();
    },
    onError: (error) => {
      props?.onError?.(error);
      console.log(error);
    },
  });

  return {
    mutateAsync,
    status,
    error,
  };
}