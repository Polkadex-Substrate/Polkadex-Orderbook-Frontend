import { useMutation } from "@tanstack/react-query";
import { useNativeApi } from "@orderbook/core/providers/public/nativeApi";
import { signAndSendExtrinsic } from "@orderbook/core/helpers";
import BigNumber from "bignumber.js";
import { NOTIFICATIONS, UNIT_BN } from "@orderbook/core/constants";
import { ExtensionAccount } from "@polkadex/react-providers";

import { useSettingsProvider } from "../providers/public/settings";

interface AssetTransferParams {
  asset: Record<string, string | null>;
  ticker: string;
  dest: string;
  amount: string;
  account: ExtensionAccount;
}
export const useAssetTransfer = (onRefetch: () => Promise<void>) => {
  const { api } = useNativeApi();
  const { onHandleError, onHandleAlert, onPushNotification } =
    useSettingsProvider();

  return useMutation({
    mutationFn: async ({
      asset,
      dest,
      amount,
      account,
      ticker,
    }: AssetTransferParams) => {
      if (!api?.isConnected)
        throw new Error("You are not connected to blockchain");

      const amountFormatted = new BigNumber(amount)
        .multipliedBy(UNIT_BN)
        .toString();
      const tx = asset?.asset
        ? api.tx.assets.transfer(asset.asset, dest, amountFormatted)
        : api.tx.balances.transfer(dest, amountFormatted);

      await signAndSendExtrinsic(api, tx, account, account.address, true);
      return { asset: ticker, amount };
    },
    onError: (error: { message: string }) =>
      onHandleError(error?.message ?? error),
    onSuccess: async (e) => {
      await onRefetch();
      onHandleAlert(
        "Deposit sent successfully. Please wait a few seconds to see the transaction in the history."
      );
      onPushNotification(NOTIFICATIONS.customTransfer(e));
    },
  });
};
