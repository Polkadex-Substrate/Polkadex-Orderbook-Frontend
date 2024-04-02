import { useNativeApi } from "@orderbook/core/providers/public/nativeApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserAccounts } from "@polkadex/react-providers";
import {
  addProxyToAccount,
  getAddressFromMnemonic,
  registerMainAccount,
} from "@orderbook/core/helpers";
import { useProfile } from "@orderbook/core/providers/user/profile";
import { MutateHookProps } from "@orderbook/core/hooks/types";

import { appsyncOrderbookService } from "../utils/orderbookService";
import { NOTIFICATIONS, QUERY_KEYS } from "../constants";
import { useSettingsProvider } from "../providers/public/settings";

export type AddProxyAccountArgs = {
  mnemonic: string;
  main: string;
  name: string;
  password?: string;
  assetId?: string;
};

interface UseAddProxyAccount extends MutateHookProps {
  onSetTempMnemonic: (value: string) => void;
}
export function useAddProxyAccount({
  onSetTempMnemonic,
  onSuccess,
  onError,
}: UseAddProxyAccount) {
  const queryClient = useQueryClient();
  const { api } = useNativeApi();
  const { wallet } = useUserAccounts();
  const { getSigner, onUserSelectTradingAddress } = useProfile();
  const { onPushNotification } = useSettingsProvider();

  const { mutateAsync, status, error } = useMutation({
    mutationFn: async ({
      mnemonic,
      main,
      name,
      password,
      assetId,
    }: AddProxyAccountArgs) => {
      if (!api || !wallet)
        throw new Error("You are not connected to blockchain ");

      const signer = getSigner(main);
      if (!signer) throw new Error("signer is not defined");

      appsyncOrderbookService.subscriber.subscribeAccountUpdate(main, () => {
        queryClient.setQueryData(
          QUERY_KEYS.singleProxyAccounts(main),
          (proxies?: string[]): string[] => {
            return proxies ? [...proxies, pair.address] : [pair.address];
          }
        );
      });

      const proxy = getAddressFromMnemonic(mnemonic);

      const registeredProxies =
        await appsyncOrderbookService.query.getTradingAddresses(main);

      if (registeredProxies.length === 0) {
        await registerMainAccount(api, proxy, signer, main, assetId);
      } else {
        await addProxyToAccount(api, proxy, signer, main, assetId);
      }

      const { pair } = wallet.addFromMnemonic(mnemonic, name, password);
      await onUserSelectTradingAddress({
        tradeAddress: pair.address,
        isNew: true,
      });
      onSetTempMnemonic(mnemonic);
    },
    onError: (error: Error) => {
      onError?.(error);
      console.log(error);
    },
    onSuccess: () => {
      onSuccess?.("Trading account created");
      onPushNotification(NOTIFICATIONS.newTradingAccount());
    },
  });

  return {
    mutateAsync,
    status,
    error,
  };
}
