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
import { KeyringPair$Json } from "@polkadot/keyring/types";

import { appsyncOrderbookService } from "../utils/orderbookService";
import { NOTIFICATIONS, QUERY_KEYS } from "../constants";
import { useSettingsProvider } from "../providers/public/settings";

import { handleTransaction } from "./../helpers/signAndSendExtrinsic";
const { googleDriveStore } = enabledFeatures;

export type KeyringTypeProxy = {
  mnemonic: string;
  name: string;
  password?: string;
  importType?: "Local" | "GDrive";
};

export type AddProxyAccountArgs = {
  tokenFeeId?: string;
  selectedWallet?: ExtensionAccount;
} & (KeyringTypeProxy | { isExtensionProxy: boolean });

interface UseAddProxyAccount extends MutateHookProps {
  onSetTempMnemonic: (value: string) => void;
  onRefetchGoogleDriveAccounts: UseQueryResult["refetch"];
  onAddAccountFromJson: (json: KeyringPair$Json) => void;
}
export function useAddProxyAccount({
  onSetTempMnemonic,
  onSuccess,
  onError,
  onRefetchGoogleDriveAccounts,
  onAddAccountFromJson,
}: UseAddProxyAccount) {
  const queryClient = useQueryClient();
  const { api } = useNativeApi();
  const { wallet } = useUserAccounts();
  const { onUserSelectTradingAddress } = useProfile();
  const { onPushNotification } = useSettingsProvider();
  const { addToTxQueue } = useTransactionManager();

  const { mutateAsync, status, error } = useMutation({
    mutationFn: async (addProxyArgs: AddProxyAccountArgs) => {
      if (!api || !wallet)
        throw new Error("You are not connected to blockchain");

      const { selectedWallet, tokenFeeId } = addProxyArgs;

      if (!selectedWallet) throw new Error("Funding account not selected");

      const registeredProxies =
        await appsyncOrderbookService.query.getTradingAddresses(
          selectedWallet.address
        );

      // Register funding account as proxy
      if ("isExtensionProxy" in addProxyArgs) {
        if (registeredProxies.includes(selectedWallet.address))
          throw new Error(
            "Funding account already registered as trading account"
          );

        appsyncOrderbookService.subscriber.subscribeAccountUpdate(
          selectedWallet.address,
          () => {
            queryClient.setQueryData(
              QUERY_KEYS.singleProxyAccounts(selectedWallet.address),
              (proxies?: string[]): string[] => {
                return proxies
                  ? [...proxies, selectedWallet.address]
                  : [selectedWallet.address];
              }
            );
          }
        );

        const signedExtrinsic =
          await appsyncOrderbookService.operation.createProxyAcccount({
            api,
            account: selectedWallet,
            proxyAddress: selectedWallet.address,
            tokenFeeId,
            firstAccount: !registeredProxies.length,
          });
        addToTxQueue(signedExtrinsic);
        await handleTransaction(signedExtrinsic);
        await onUserSelectTradingAddress({
          tradeAddress: selectedWallet.address,
          isNew: true,
        });
        return;
      }

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

      // Create trading account with keyring type
      const { mnemonic, name, password, importType } = addProxyArgs;
      const proxy = getAddressFromMnemonic(mnemonic);

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
        await onAddAccountFromJson(jsonAccount);
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
