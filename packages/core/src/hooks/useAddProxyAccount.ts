import { useNativeApi } from "@orderbook/core/providers/public/nativeApi";
import {
  UseQueryResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  ExtensionAccount,
  useTransactionManager,
  useUserAccounts,
} from "@polkadex/react-providers";
import {
  enabledFeatures,
  getAddressFromMnemonic,
} from "@orderbook/core/helpers";
import { useProfile } from "@orderbook/core/providers/user/profile";
import { MutateHookProps } from "@orderbook/core/hooks/types";

import { appsyncOrderbookService } from "../utils/orderbookService";
import { NOTIFICATIONS, QUERY_KEYS } from "../constants";
import { useSettingsProvider } from "../providers/public/settings";
import { GoogleDrive } from "../providers/user/connectWalletProvider";

import { handleTransaction } from "./../helpers/signAndSendExtrinsic";
const { googleDriveStore } = enabledFeatures;

export type AddProxyAccountArgs = {
  mnemonic: string;
  name: string;
  password?: string;
  tokenFeeId?: string;
  selectedWallet?: ExtensionAccount;
  importType?: "Local" | "GDrive";
};

interface UseAddProxyAccount extends MutateHookProps {
  onSetTempMnemonic: (value: string) => void;
  onRefetchGoogleDriveAccounts: UseQueryResult["refetch"];
}
export function useAddProxyAccount({
  onSetTempMnemonic,
  onSuccess,
  onError,
  onRefetchGoogleDriveAccounts,
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
      importType,
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

      const signedExtrinsic =
        await appsyncOrderbookService.operation.createProxyAcccount({
          api,
          account: selectedWallet,
          proxyAddress: proxy,
          tokenFeeId,
          firstAccount: !registeredProxies.length,
        });
      addToTxQueue(signedExtrinsic);
      await handleTransaction(signedExtrinsic);
      const { pair } = wallet.addFromMnemonic(mnemonic, name, password);
      if (importType === "GDrive" && googleDriveStore) {
        const jsonAccount = pair.toJson(password);
        await GoogleDrive.addFromJson(jsonAccount);
        await onRefetchGoogleDriveAccounts();
      }

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
