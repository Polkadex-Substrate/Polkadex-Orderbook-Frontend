import { useMutation } from "@tanstack/react-query";
import { useUserAccounts } from "@polkadex/react-providers";

import { useProfile } from "../providers/user/profile";

import { MutateHookProps } from "./types";

export type ImportFromMnemonic = {
  mnemonic: string;
  name: string;
  password: string;
};

export const useImportProxyAccountMnemonic = (props: MutateHookProps) => {
  const { wallet, isReady } = useUserAccounts();
  const { onUserSelectTradingAddress } = useProfile();

  const { mutateAsync, status, error } = useMutation({
    mutationFn: async ({ mnemonic, name, password }: ImportFromMnemonic) => {
      if (!isReady) throw new Error("Can't import before initialization");

      const { pair } = wallet.add(mnemonic, name, password);
      await onUserSelectTradingAddress({
        tradeAddress: pair.address,
        isNew: true,
      });
    },
    onError: (e) => console.log("Error", e),
    onSuccess: () =>
      props?.onSuccess?.("Trading account imported successfully"),
  });

  return {
    mutateAsync,
    status,
    error,
  };
};
