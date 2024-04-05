import { useNativeApi } from "@orderbook/core/providers/public/nativeApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ExtensionAccount,
  useTransactionManager,
  useUserAccounts,
} from "@polkadex/react-providers";
import { getAddressFromMnemonic } from "@orderbook/core/helpers";
import { useProfile } from "@orderbook/core/providers/user/profile";
import { MutateHookProps } from "@orderbook/core/hooks/types";

import { appsyncOrderbookService } from "../utils/orderbookService";
import { NOTIFICATIONS, QUERY_KEYS } from "../constants";
import { useSettingsProvider } from "../providers/public/settings";

export type AddProxyAccountArgs = {
  mnemonic: string;
  name: string;
  password?: string;
  tokenFeeId?: string;
  selectedWallet?: ExtensionAccount;
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
  const { onUserSelectTradingAddress } = useProfile();
  const { onPushNotification } = useSettingsProvider();
  const { addToTxQueue } = useTransactionManager();

  const { mutateAsync, status, error } = useMutation({
    mutationFn: async ({
      mnemonic,
      name,
      password,
      tokenFeeId,
      selectedWallet,
    }: AddProxyAccountArgs) => {
      if (!api || !wallet)
        throw new Error("You are not connected to blockchain ");

      if (!selectedWallet) throw new Error("selectedWallet is not defined");

      appsyncOrderbookService.subscriber.subscribeAccountUpdate(
        selectedWallet.address,
        () => {
          queryClient.setQueryData(
            QUERY_KEYS.singleProxyAccounts(selectedWallet.address),
            (proxies?: string[]): string[] => {
              return proxies ? [...proxies, pair.address] : [pair.address];
            }
          );
        }
      );

      const proxy = getAddressFromMnemonic(mnemonic);

      const registeredProxies =
        await appsyncOrderbookService.query.getTradingAddresses(
          selectedWallet.address
        );

      if (registeredProxies.length === 0) {
        const signedExtrinsic =
          await appsyncOrderbookService.operation.registerMainAccount({
            api,
            account: selectedWallet,
            proxyAddress: proxy,
            tokenFeeId,
          });
        addToTxQueue(signedExtrinsic);
      } else {
        const signedExtrinsic =
          await appsyncOrderbookService.operation.addAccount({
            api,
            account: selectedWallet,
            proxyAddress: proxy,
            tokenFeeId,
          });
        addToTxQueue(signedExtrinsic);
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
