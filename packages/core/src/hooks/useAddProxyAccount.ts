import { useNativeApi } from "@orderbook/core/providers/public/nativeApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserAccounts } from "@polkadex/react-providers";
import {
  addProxyToAccount,
  getAddressFromMnemonic,
} from "@orderbook/core/helpers";
import {
  UserAddressTuple,
  useProfile,
} from "@orderbook/core/providers/user/profile";
import { MutateHookProps } from "@orderbook/core/hooks/types";

import { appsyncOrderbookService } from "../utils/orderbookService";
import { QUERY_KEYS } from "../constants";

export type AddProxyAccountArgs = {
  mnemonic: string;
  main: string;
  name: string;
  password?: string;
};
export function useAddProxyAccount(props: MutateHookProps) {
  const queryClient = useQueryClient();
  const { api } = useNativeApi();
  const { wallet } = useUserAccounts();
  const { getSigner, onUserSelectTradingAddress } = useProfile();

  const { mutateAsync, status, error } = useMutation({
    mutationFn: async ({
      mnemonic,
      main,
      name,
      password,
    }: AddProxyAccountArgs) => {
      if (!api || !wallet)
        throw new Error("You are not connected to blockchain ");

      const signer = getSigner(main);
      if (!signer) throw new Error("signer is not defined");

      const proxy = getAddressFromMnemonic(mnemonic);
      await addProxyToAccount(api, proxy, signer, main);
      const { pair } = wallet.add(mnemonic, name, password);

      appsyncOrderbookService.subscriber.subscribeAccountUpdate(main, () => {
        queryClient.setQueryData(
          QUERY_KEYS.proxyAccounts(),
          (proxies: UserAddressTuple[]) => {
            return [
              ...proxies,
              {
                mainAddress: main,
                tradeAddress: pair.address,
              },
            ];
          }
        );
        onUserSelectTradingAddress({ tradeAddress: pair.address, isNew: true });
        props?.onSuccess?.("Trading account created");
      });
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
