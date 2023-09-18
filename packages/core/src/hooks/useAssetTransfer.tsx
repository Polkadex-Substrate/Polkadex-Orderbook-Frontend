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

export const useAssetTransfer = () => {
  const { api } = useNativeApi();
  const { onHandleError } = useSettingsProvider();

  return useMutation(
    async ({ asset, dest, amount, account }: AssetTransferParams) => {
      try {
        // TODO: Fix types or Handle Error...
        const amountFormatted = new BigNumber(amount)
          .multipliedBy(UNIT_BN)
          .toString();
        if (api) {
          const tx = asset?.polkadex
            ? api.tx.balances.transfer(dest, amountFormatted)
            : api.tx.assets.transfer(asset.asset, dest, amountFormatted);
          await signAndSendExtrinsic(api, tx, account, account.account.address);
        }
      } catch (error) {
        console.log("Error", error);
        onHandleError(error?.message ?? error);
      }
    }
  );
};
