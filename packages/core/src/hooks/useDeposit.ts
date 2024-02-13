import { useMutation } from "@tanstack/react-query";
import { ExtensionAccount } from "@polkadex/react-providers";

import { useSettingsProvider } from "../providers/public/settings";
import { useNativeApi } from "../providers/public/nativeApi";
import { appsyncOrderbookService } from "../utils/orderbookService";
import { useOrderbookService } from "../providers/public/orderbookServiceProvider/useOrderbookService";

export interface DepositArgs {
  amount: string | number;
  asset: Record<string, string | null>;
  account: ExtensionAccount;
}

export const useDeposit = () => {
  const { onHandleError, onHandleNotification } = useSettingsProvider();
  const { api } = useNativeApi();
  const { isReady } = useOrderbookService();

  const { mutateAsync, status } = useMutation({
    mutationFn: async ({ asset, amount, account }: DepositArgs) => {
      if (!isReady) throw new Error("Orderbook service not initialized");

      if (!api || !api?.isConnected)
        throw new Error("You are not connected to blockchain");

      if (account.address.trim().length === 0)
        throw new Error("Invalid account");

      onHandleNotification({
        type: "Information",
        message: "Processing Deposit...",
      });

      await appsyncOrderbookService.operation.deposit({
        api,
        account,
        asset,
        amount,
      });
    },
    onError: (error) => {
      const errorMessage = (error as Error).message ?? (error as string);
      onHandleError(errorMessage);
    },
    onSuccess: () =>
      onHandleNotification({
        type: "Success",
        message:
          "Congratulations! You have successfully deposited assets to your trading account.",
      }),
  });

  return { mutateAsync, loading: status === "loading" };
};
