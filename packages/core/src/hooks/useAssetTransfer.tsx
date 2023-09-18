import { useMutation } from "react-query";
import { useNativeApi } from "@orderbook/core/providers/public/nativeApi";
import { signAndSendExtrinsic } from "@orderbook/core/helpers";

import { ExtensionAccount } from "../providers/types";
import { useSettingsProvider } from "../providers/public/settings";

interface AssetTransferParams {
  asset: Record<string, string | null>;
  dest: string;
  amount: string;
  account: ExtensionAccount;
}

export const useAssetTransfer = () => {
  const { api } = useNativeApi();
  const { onHandleError } = useSettingsProvider();

  return useMutation(
    async ({ asset, dest, amount, account }: AssetTransferParams) => {
      try {
        // TODO: Fix types or Handle Error...
        if (api) {
          const tx = asset?.polkadex
            ? api.tx.balances.transfer(dest, amount)
            : api.tx.assets.transfer(asset.asset, dest, amount);
          return await signAndSendExtrinsic(
            api,
            tx,
            account.signer,
            account.account.address
          );
        }
      } catch (error) {
        console.log("Error", error);
        onHandleError(error?.message ?? error);
      }
    }
  );
};
