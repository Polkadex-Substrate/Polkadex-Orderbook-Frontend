import { useMutation } from "react-query";
import { useNativeApi } from "@orderbook/core/providers/public/nativeApi";
import { signAndSendExtrinsic } from "@orderbook/core/helpers";
import BigNumber from "bignumber.js";
import { UNIT_BN } from "@orderbook/core/constants";

import { ExtensionAccount } from "../providers/types";
import { useSettingsProvider } from "../providers/public/settings";

interface AssetTransferParams {
  asset: Record<string, string | null>;
  dest: string;
  amount: string;
  account: ExtensionAccount;
}

export const useAssetTransfer = (onRefetch: () => void) => {
  const { api } = useNativeApi();
  const { onHandleError, onHandleNotification } = useSettingsProvider();

  return useMutation({
    mutationFn: async ({
      asset,
      dest,
      amount,
      account,
    }: AssetTransferParams) => {
      // TODO: Fix types or Handle Error...
      const amountFormatted = new BigNumber(amount)
        .multipliedBy(UNIT_BN)
        .toString();
      if (api) {
        const tx = asset?.asset
          ? api.tx.assets.transfer(asset.asset, dest, amountFormatted)
          : api.tx.balances.transfer(dest, amountFormatted);
        return await signAndSendExtrinsic(
          api,
          tx,
          account,
          account.account.address
        );
      }
    },
    onError: (error: { message: string }) =>
      onHandleError(error?.message ?? error),
    onSuccess: () => {
      onHandleNotification({
        type: "Success",
        message:
          "Deposit sent successfully. Please wait a few seconds to see the transaction in the history.",
      });
      onRefetch();
    },
  });
};
